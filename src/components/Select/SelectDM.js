import React, { useState } from "react";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import styles from "./SelectDM.module.css";
import classNames from "classnames";
import photo from "../../assets/picture-thumbnail.svg";

const SelectDM = () => {
  const [aiModel, setAIModel] = useState("");
  const [disease, setDisease] = useState("");
  const [imageUrl, setImageUrl] = useState(photo);

  const [step, setStep] = useState(1);

  const changeImageUrl = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImageUrl(reader.result);
      } else setImageUrl(photo);
    };
    try {
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      setImageUrl(photo);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <form>
          <Card className={styles.card}>
            <div className={classNames(styles.content1)}>
              <h2>aaiway</h2>
              <FormControl className={styles.inputControl} variant="outlined">
                <InputLabel id="select-disease">Disease</InputLabel>
                <Select
                  className={styles.input}
                  value={aiModel}
                  label="Disease"
                  onChange={(e) => {
                    setAIModel(e.target.value);
                  }}
                >
                  <MenuItem value="Disease 1">Disease 1</MenuItem>
                  <MenuItem value="Disease 2">Disease 2</MenuItem>
                  <MenuItem value="Disease 3">Disease 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={styles.inputControl} variant="outlined">
                <InputLabel id="select-ai-model">Ai Model</InputLabel>
                <Select
                  className={styles.input}
                  labelId="select-ai-model"
                  label="Ai Model"
                  value={disease}
                  onChange={(e) => {
                    setDisease(e.target.value);
                  }}
                >
                  <MenuItem value="Model 1">Model 1</MenuItem>
                  <MenuItem value="Model 2">Model 2</MenuItem>
                  <MenuItem value="Model 3">Model 3</MenuItem>
                </Select>
              </FormControl>

              <div className={styles.nextBtn}>
                <Button className={styles.btnNext} variant="contained">
                  Submit
                </Button>
              </div>
            </div>
            <div className={classNames(styles.content2)}>
              <h3>Select an Image</h3>
              <img src={imageUrl} alt="x-ray"></img>
              <input
                type="file"
                id="file"
                accept="image/jpg, image/png, image/webp, image/jpeg"
                onChange={changeImageUrl}
              />
              <label htmlFor="file" className={styles.btn3}>
                <span>Select</span>
              </label>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};
export default SelectDM;
