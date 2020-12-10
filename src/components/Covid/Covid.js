import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  IconButton,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import styles from "./Covid.module.css";
import classNames from "classnames";
import photo from "../../assets/picture-thumbnail.svg";
import axios from "axios";
import { motion } from "framer-motion";

const Covid = () => {
  const [aiModel, setAIModel] = useState("");
  const [disease, setDisease] = useState("Disease 1");
  const [imageUrl, setImageUrl] = useState(photo);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("Result");
  const [tempClass, setTempClass] = useState(styles.nothing);
  const [loading, setLoading] = useState(false);
  const [alpha, setAlpha] = useState(0);
  const [isError, setIsError] = useState(false);

  const changeImageUrl = (e) => {
    let reader = new FileReader();
    setUrl(e.target.files[0]);
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

  const handleError = (e) => {
    setTimeout(() => {
      setIsError(true);
      setResult("Somethng went wrong. Please reload session !");
      setLoading(false);
      setAlpha(1);
    }, 5000);
  };

  const changeClass = () => {
    setTempClass(styles.rightActive);
    setIsError(true);
    //console.log("Clicked");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlpha(0);
    try {
      const formData = new FormData();
      formData.append("file", url, url.name);
      console.log(url);
      await axios
        .post("https://aaiwayindia.com:5002/predict", formData, {
          headers: { "content-type": "multipart/form-data" },
          method: "POST",
        })
        .then((res) => {
          //   console.log(res);
          setTimeout(() => {
            if (res.data.Disease) {
              setResult("High Risk of Covid!");
            } else setResult("Low risk of Covid");
            setLoading(false);
            setAlpha(1);
            setIsError(false);
          }, 3000);
        })
        .catch((e) => handleError(e));
    } catch (error) {
      setResult("Something went wrong! Please load session again");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={2}>
          <Grid item md={12} className={styles.formContainer}>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <Card className={styles.card}>
                <div className={styles.outer}>
                  <div className={classNames(styles.content1, tempClass)}>
                    <h2>aaiway</h2>
                    <p>Covid Analysis</p>
                    <FormControl
                      className={styles.inputControl}
                      variant="outlined"
                    >
                      <InputLabel id="select-disease">Disease</InputLabel>
                      <Select
                        className={styles.input}
                        value={disease}
                        label="Ai Model"
                        disabled
                        onChange={(e) => {
                          setDisease(e.target.value);
                        }}
                      >
                        <MenuItem value="Disease 1">COVID-19</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      className={styles.inputControl}
                      variant="outlined"
                    >
                      <InputLabel id="select-ai-model">Ai Model</InputLabel>
                      <Select
                        className={styles.input}
                        labelId="select-ai-model"
                        label="Ai Model"
                        value={aiModel}
                        onChange={(e) => {
                          setAIModel(e.target.value);
                        }}
                      >
                        <MenuItem value="Model 1">CNN Model</MenuItem>
                        {/* <MenuItem value="Model 2">Model 2</MenuItem>
                  <MenuItem value="Model 3">Model 3</MenuItem> */}
                      </Select>
                    </FormControl>
                    <div>
                      <IconButton
                        className={styles.nextButton}
                        onClick={changeClass}
                      >
                        <i className="fas fa-chevron-circle-right" />
                      </IconButton>
                    </div>
                  </div>
                  <div className={classNames(styles.content2, tempClass)}>
                    <h3>Select an Image</h3>
                    <div className={styles.imageContainer}>
                      <img src={imageUrl} alt="x-ray"></img>
                    </div>
                    <Button
                      className={styles.inputBtn}
                      variant="contained"
                      component="label"
                    >
                      <i className="fas fa-plus" />
                      Upload File
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
                    <div className={styles.submitBtn}>
                      <Button
                        type="submit"
                        className={styles.btnSubmit}
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {loading ? (
                        <CircularProgress className={styles.result} />
                      ) : (
                        <h4
                          style={{
                            opacity: alpha,
                            color: isError ? "red" : "green",
                          }}
                          className={styles.result}
                        >
                          {result}
                        </h4>
                      )}
                    </div>
                    <div className={styles.backBtn}>
                      <Button
                        onClick={() => {
                          setTempClass(styles.nothing);
                          setLoading(false);
                          setAlpha(0);
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </form>
          </Grid>
        </Grid>
      </motion.div>
    </div>
  );
};
export default Covid;
