from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg19 import preprocess_input
from keras.applications.vgg19 import decode_predictions
from keras.applications.vgg19 import VGG19
from keras.applications.mobilenet import MobileNet
from keras.applications.inception_resnet_v2 import InceptionResNetV2
from keras.applications.inception_v3 import InceptionV3
from keras.layers import GlobalAveragePooling2D, Dense, Dropout, Flatten
from keras.models import Sequential
from keras import optimizers, callbacks, regularizers
from PIL import Image
from keras.applications.vgg19 import decode_predictions
import numpy as np
from keras.layers import Flatten, Dense, Input, Conv2D, MaxPooling2D, GlobalAveragePooling2D, GlobalMaxPooling2D, AvgPool2D, Lambda, Dropout, GlobalAveragePooling2D, multiply, LocallyConnected2D, BatchNormalization
from keras.models import Sequential, Model
from keras.callbacks import TensorBoard, ModelCheckpoint, \
    LearningRateScheduler, EarlyStopping, ReduceLROnPlateau
from keras.optimizers import Adam
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
from flask import Flask, redirect, url_for, request, render_template, Response, jsonify, redirect
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
import os
import sys
app = Flask(__name__)

label = ['Atelectasis', 'COVID-19', 'Cardiomegaly', 'Consolidation', 'Edema', 'Effusion', 'Emphysema',
         'Fibrosis', 'Hernia', 'Infiltration', 'Mass', 'Nodule', 'Pleural_Thickening', 'Pneumonia', 'Pneumothorax']


def disease(arr, lbl):
    f = []
    k = [round(x, 2) for x in arr]
    for i in range(len(arr)):
        if k[i] > 0.65 and k[i] < 0.93:
            f.append(lbl[i])
    print(k)
    return f


def _create_attention_model(frozen_model, label):
    '''
      Creates an attention model to train on a pre-trained model
      output features

      Args:
        frozen_model: The VGG19 frozen network
        labels: The labels to use
        optimizer: The optimizer to use

      Returns:
        The created Model.
    '''

    frozen_features = Input(frozen_model.get_output_shape_at(0)[
        1:], name='feature_input')
    frozen_depth = frozen_model.get_output_shape_at(0)[-1]
    new_features = BatchNormalization()(frozen_features)

    # here we do an attention mechanism to turn pixels in the GAP on an off
    attention_layer = Conv2D(128, kernel_size=(1, 1), padding='same',
                             activation='elu')(new_features)
    attention_layer = Conv2D(32, kernel_size=(1, 1), padding='same',
                             activation='elu')(attention_layer)
    attention_layer = Conv2D(16, kernel_size=(1, 1), padding='same',
                             activation='elu')(attention_layer)
    attention_layer = AvgPool2D((2, 2), strides=(1, 1), padding='same')(
        attention_layer)  # smooth results
    attention_layer = Conv2D(1, kernel_size=(
        1, 1), padding='valid', activation='sigmoid')(attention_layer)

    # fan it out to all of the channels
    up_c2_w = np.ones((1, 1, 1, frozen_depth))
    up_c2 = Conv2D(frozen_depth, kernel_size=(1, 1), padding='same',
                   activation='linear', use_bias=False, weights=[up_c2_w])
    up_c2.trainable = False
    attention_layer = up_c2(attention_layer)

    mask_features = multiply([attention_layer, new_features])
    gap_features = GlobalAveragePooling2D()(mask_features)
    gap_mask = GlobalAveragePooling2D()(attention_layer)

    # to account for missing values from the attention model
    gap = Lambda(lambda x: x[0]/x[1],
                 name='RescaleGAP')([gap_features, gap_mask])
    gap_dr = Dropout(0.5)(gap)
    dr_steps = Dropout(0.5)(Dense(128, activation='elu')(gap_dr))
    out_layer = Dense(len(label), activation='sigmoid')(dr_steps)

    # creating the final model
    attention_model = Model(inputs=[frozen_features], outputs=[
                            out_layer], name='attention_model')

    return attention_model


def MakeVGGModel(IMG_SIZE, channels=3):
    base_model = VGG19(input_shape=(*IMG_SIZE, channels),  # Need to define the shape here from IMG_SIZE
                       include_top=False, weights=None)
    attention_model = _create_attention_model(base_model, label)
    model = Sequential()
    model.add(base_model)
    model.add(attention_model)
    print(f'{model.summary()}')
    return model


def MakeMobileNetModel(IMG_SIZE, channels=3):
    model = Sequential()
    base_model = MobileNet(input_shape=(*IMG_SIZE, channels),  # Need to define the shape here from IMG_SIZE
                           include_top=False, weights=None)
    attention_model = _create_attention_model(base_model, label)
    model = Sequential()
    model.add(base_model)
    model.add(attention_model)
    print(f'{model.summary()}')
    return model


def MakeResnetModel(IMG_SIZE,  channels=3):
    model = Sequential()
    base_model = InceptionResNetV2(input_shape=(*IMG_SIZE, channels),  # Need to define the shape here from IMG_SIZE
                                   include_top=False, weights=None)
    attention_model = _create_attention_model(base_model, label)
    model = Sequential()
    model.add(base_model)
    model.add(attention_model)
    print(f'{model.summary()}')
    return model


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('predict.html')


def MaxVoteEnsemble(predictionList):
    ensemble_preds = np.maximum(*predictionList)
    return ensemble_preds


@app.route('/prediction', methods=['GET'])
def prediction():
    return render_template('predict.html')


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # Get the image from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        img = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(img)

        image_vgg = load_img(img, target_size=(224, 224, 3))
        vgg_model = MakeVGGModel((224, 224), 3)
        vgg_model.load_weights('./weights.best.vgg.hdf5', reshape=True)

        mobilenet_model = MakeMobileNetModel((224, 224), 3)
        mobilenet_model.load_weights(
            './weights.best.mobilenet.hdf5', reshape=True)
        image_vgg = img_to_array(image_vgg)
        image_vgg = image_vgg.reshape(
            (1, image_vgg.shape[0], image_vgg.shape[1], image_vgg.shape[2]))
        image_vgg = preprocess_input(image_vgg)

        image_mobilenet = load_img(img, target_size=(224, 224, 3))
        image_mobilenet = img_to_array(image_mobilenet)
        image_mobilenet = image_mobilenet.reshape(
            (1, image_mobilenet.shape[0], image_mobilenet.shape[1], image_mobilenet.shape[2]))
        image_mobilenet = preprocess_input(image_mobilenet)
        vgg_pred = vgg_model.predict(image_vgg)
        mobilenet_pred = mobilenet_model.predict(image_mobilenet)
        predictionList = [vgg_pred, mobilenet_pred]
        max_vote_ensemble_preds = MaxVoteEnsemble(predictionList)
        z = disease(max_vote_ensemble_preds[0], label)
        if len(z) == 0:
            return "No disease found"
        print(z)
        y = "Predicted Diseases are "
        x = y+" , ".join(z)
        return x
    return None


if __name__ == '__main__':
    # app.run(debug=True)

    # Serve the app with gevent
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
