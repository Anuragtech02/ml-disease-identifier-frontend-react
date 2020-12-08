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
import styles from "./Analysis.module.css";
import classNames from "classnames";
import photo from "../../assets/picture-thumbnail.svg";
import axios from "axios";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import Skeleton from "@material-ui/lab/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Analysis = () => {
  const [aiModel, setAIModel] = useState("");
  const [disease, setDisease] = useState("");
  const [imageUrl, setImageUrl] = useState(photo);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("Result");
  const [tempClass, setTempClass] = useState(styles.nothing);
  const [loading, setLoading] = useState(false);
  const [alpha, setAlpha] = useState(0);
  const [isError, setIsError] = useState(false);
  const [chart, setChart] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmaps, setHeatmaps] = useState([]);

  const sliderRef = createRef(null);

  // const image = createRef();

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

  const onForwardClick = () => {
    sliderRef.current.slickNext();
  };

  const onBackkwardClick = () => {
    sliderRef.current.slickPrev();
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
          console.log(res);
          let tempName = "";
          setTimeout(() => {
            res.data.heatmaps.forEach(
              (heatmap) => (tempName = tempName + heatmap.name + " found, ")
            );
            !res.data.heatmaps.length
              ? setResult("No disease found!")
              : setResult(tempName);
            setLoading(false);
            setChart(true);
            setShowHeatmap(true);
            setHeatmaps(res.data.heatmaps);
            setPredictions(res.data.prediction);
            localStorage.setItem("heatmaps", JSON.stringify(res.data.heatmaps));
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
          <Grid item md={showHeatmap ? 6 : 12} className={styles.formContainer}>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <Card className={styles.card}>
                <div className={styles.outer}>
                  <div className={classNames(styles.content1, tempClass)}>
                    <h2>aaiway</h2>
                    <p>Other Diseases</p>
                    <FormControl
                      className={styles.inputControl}
                      variant="outlined"
                    >
                      <InputLabel id="select-disease">Disease</InputLabel>
                      <Select
                        className={styles.input}
                        value={aiModel}
                        label="Disease"
                        onChange={(e) => {
                          setAIModel(e.target.value);
                        }}
                      >
                        <MenuItem value="Disease 1">Related to Lungs</MenuItem>
                        <MenuItem value="Disease 2">Related to Heart</MenuItem>
                        <MenuItem value="Disease 3">Something else</MenuItem>
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
                        value={disease}
                        onChange={(e) => {
                          setDisease(e.target.value);
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
          <Grid item md={showHeatmap ? 6 : 0} className={styles.chartContainer}>
            {showHeatmap ? (
              <Card className={styles.heatmapCard}>
                <IconButton
                  onClick={onBackkwardClick}
                  className={classNames(styles.arrowIcon, styles.arrowBackward)}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <h2>Heatmaps</h2>
                <HeatmapSlider sliderRef={sliderRef} heatmaps={heatmaps} />
                <IconButton
                  onClick={onForwardClick}
                  className={classNames(styles.arrowIcon, styles.arrowForward)}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </motion.div>
      <div className={styles.graphContainer}>
        {chart ? (
          <ChartComponent className={styles.graph} predictions={predictions} />
        ) : null}
      </div>
    </div>
  );
};
export default Analysis;

const ChartComponent = ({ predictions }) => {
  let labels = [],
    diseases = [],
    bgColors = [];
  predictions.forEach((prediction) => {
    labels.push(prediction.name);
    diseases.push((parseFloat(prediction.value) * 100).toFixed(2));
    if (prediction.value <= 0.1) bgColors.push("green");
    if (prediction.value > 0.1 && prediction.value <= 0.2)
      bgColors.push("yellow");
    if (prediction.value > 0.2) bgColors.push("red");
  });

  console.log(predictions);

  return (
    <div style={{ width: "100%", margin: "50px 0" }}>
      {predictions && predictions.length ? (
        <Bar
          className={styles.barGraph}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Disease",
                backgroundColor: bgColors,
                data: diseases,
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: "Risk Probability" },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 100,
                  },
                },
              ],
            },
          }}
        />
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

const HeatmapSlider = ({ heatmaps, sliderRef }) => {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    setTemp(JSON.parse(localStorage.getItem("heatmaps")));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      {heatmaps.map((heatmap) => {
        return (
          <div key={heatmap.name} className={styles.heatmap}>
            <div className={styles.heatmapImage}>
              <img
                src={`data:image/jpg;base64, ${heatmap.image.slice(
                  2,
                  heatmap.image.length - 1
                )}`}
                alt="heatmap"
              />
            </div>
            <div className={styles.heatmapName}>
              <h4>{heatmap.name}</h4>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};
