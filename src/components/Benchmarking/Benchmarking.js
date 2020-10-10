import React, { useState } from "react";
import styles from "./Benchmarking.module.css";
import { Grid, Card, Button } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import gallery from "../../assets/picture-thumbnail.svg";

const Benchmarking = () => {
  const [photoFromUrl, setPhotoFromUrl] = useState("");

  const changeImageUrl = () => {};

  return (
    <Grid container className={styles.container} spacing={4}>
      <Grid item md={6}>
        <Card className={styles.original}>
          <div className={styles.title}>
            <h4>Select Image</h4>
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
            <Button variant="contained" className={styles.uploadBtn}>
              Upload
            </Button>
          </form>
        </Card>
      </Grid>
      <Grid item md={6}>
        <Card className={styles.compareImage}></Card>
      </Grid>
    </Grid>
  );
};

export default Benchmarking;
