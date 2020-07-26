import React from "react";
import { Card, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Welcome.module.css";
import aiRobot from "../../assets/ai-robot.svg";
import covid from "../../assets/covid.svg";
import thumbnail from "../../assets/picture-thumbnail.svg";
import { motion } from "framer-motion";

const Welcome = () => {
  return (
    <div className={styles.outerContainer}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.heading}>
          <Typography variant="h1">Hi Dr. Prasad! Welcome to DIAL</Typography>
        </div>
        <div className={styles.para}>
          <p>
            Disease Identification and Labeling (DIAL) is an Artificial
            Intelligence based application for image analysis and labeling to
            assist the doctors in predicting diseases. <br></br> <br />
            For example, lung Disease can be considered as the second most
            common type of disease for men and women. Many people die of lung
            disease such as lung cancer, Asthma, CPD (Chronic pulmonary disease)
            etc. in every year. Early prediction and detection of lung cancer
            can lessen the probability of deaths.
          </p>
        </div>
        <div className={styles.cardSection}>
          <div className={styles.title}>
            <h4>Let's see how it works.</h4>
          </div>
          <div className={styles.cards}>
            <Card className={styles.card}>
              <h4>Step 1</h4>
              <img src={covid} alt="Covid man" />
              <h3>Select Disease</h3>
            </Card>
            <i className="fas fa-play-circle"></i>
            <Card className={styles.card}>
              <h4>Step 2</h4>
              <img className={styles.robotImage} src={aiRobot} alt="AI Robot" />
              <h3>Select AI Model</h3>
            </Card>
            <i className="fas fa-play-circle"></i>
            <Card className={styles.card}>
              <h4>Step 3</h4>
              <img src={thumbnail} alt="Thumbnail" />
              <h3>Upload Image</h3>
            </Card>
          </div>
          <div className={styles.startBtn}>
            <Link className={styles.noDecoration} to="/select">
              <Button
                className={styles.startButton}
                color="primary"
                variant="contained"
                size="large"
              >
                Let's get started
                <i className="fas fa-play" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Welcome;
