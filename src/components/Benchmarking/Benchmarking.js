import React, { useState } from "react";
import styles from "./Benchmarking.module.css";
import {
  Grid,
  Card,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import sampleXray from "../../assets/sample-xray.jpeg";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import CancelIcon from "@material-ui/icons/Cancel";
import atelectasis from "../../assets/Ideal/Atelectasis/atelectasis.png";
import nodule from "../../assets/Ideal/Nodule/nodule.png";
import emphysema from "../../assets/Ideal/Emphysema/emphysema.png";

const Benchmarking = () => {
  const [photoFromUrl, setPhotoFromUrl] = useState("");
  const [prevImage, setPrevImage] = useState(photoFromUrl);
  const [comparisonImage, setComparisonImage] = useState(atelectasis);
  const [comparisonImageTitle, setComparisonImageTitle] = useState("image1");
  const [modalOpen, setModalOpen] = useState(false);

  const changeImageUrl = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPhotoFromUrl(reader.result);
        setPrevImage(reader.result);
      } else setPhotoFromUrl(prevImage);
    };
    try {
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      setPhotoFromUrl(prevImage);
    }
  };

  const modal = {
    images: [photoFromUrl ? photoFromUrl : sampleXray, sampleXray],
    titles: ["Original Image", "Comparison Image"],
  };

  return (
    <>
      <Grid container className={styles.container} spacing={4}>
        <Grid item md={6} sm={12}>
          <Card className={styles.original}>
            <Tooltip
              placement="top"
              title="Expand Image"
              className={styles.fullScreen}
            >
              <IconButton onClick={() => setModalOpen(true)}>
                <FullscreenIcon />
              </IconButton>
            </Tooltip>
            <div className={styles.title}>
              <h4>Select X-Ray/CT-Scan Image</h4>
            </div>
            <form className={styles.originalPhotoForm}>
              <div className={styles.originalImage}>
                {photoFromUrl ? (
                  <img src={photoFromUrl} alt="original" />
                ) : (
                  <Button
                    variant="default"
                    component="label"
                    className={styles.selectBtn}
                  >
                    <AddPhotoAlternateIcon fontSize="large" />
                    <input
                      required
                      type="file"
                      id="file"
                      name="image"
                      onChange={changeImageUrl}
                      accept="image/jpg, image/png, image/jpeg"
                      style={{ width: "0", opacity: "0" }}
                    />
                  </Button>
                )}
              </div>
              <Button
                variant="default"
                component="label"
                className={styles.uploadBtn}
              >
                Select
                <input
                  required
                  type="file"
                  id="file"
                  name="image"
                  onChange={changeImageUrl}
                  accept="image/jpg, image/png, image/jpeg"
                  style={{ width: "0", opacity: "0" }}
                />
              </Button>
            </form>
          </Card>
        </Grid>
        <Grid item md={6} sm={12}>
          <Card className={styles.compareImage}>
            <FormControl variant="outlined" className={styles.selectBox}>
              <InputLabel>Comparison Image</InputLabel>
              <Select
                value={comparisonImageTitle}
                onChange={(e) => {
                  setComparisonImageTitle(e.target.value);
                  if (e.target.value === "image1")
                    setComparisonImage(atelectasis);
                  else if (e.target.value === "image2")
                    setComparisonImage(emphysema);
                  else setComparisonImage(nodule);
                }}
                label="Comparison Image"
              >
                <MenuItem value="image1">Atelectasis</MenuItem>
                <MenuItem value="image2">Emphysema</MenuItem>
                <MenuItem value="image3">Nodule</MenuItem>
              </Select>
            </FormControl>
            <div className={styles.compareImageContainer}>
              <img src={comparisonImage} alt="" />
            </div>
          </Card>
        </Grid>
      </Grid>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        images={[photoFromUrl, comparisonImage]}
        titles={modal.titles}
      />
    </>
  );
};

export default Benchmarking;

const Modal = ({ images, modalOpen, setModalOpen }) => {
  return (
    <div
      className={styles.modal}
      style={{
        opacity: modalOpen ? "1" : "0",
        pointerEvents: modalOpen ? "all" : "none",
      }}
      onClick={() => setModalOpen(false)}
    >
      <IconButton
        className={styles.closeBtn}
        onClick={() => setModalOpen(false)}
      >
        <CancelIcon />
      </IconButton>
      <Grid container spacing={4}>
        <Grid className={styles.modalItem} md={6} sm={12}>
          <div className={styles.modalTitle}>
            <h3>Original Image</h3>
          </div>
          <div className={styles.modalImage}>
            <img src={images[0]} alt="modal-disease-fullscreen" />
          </div>
        </Grid>
        <Grid className={styles.modalItem} md={6} sm={12}>
          <div className={styles.modalTitle}>
            <h3>Comparison Image</h3>
          </div>
          <div className={styles.modalImage}>
            <img src={images[1]} alt="modal-disease-fullscreen" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
