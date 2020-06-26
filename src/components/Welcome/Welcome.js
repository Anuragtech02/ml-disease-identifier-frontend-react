import React from "react";
import { Card, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Welcome.module.css";
import aiRobot from "../../assets/ai-robot.svg";
import covid from "../../assets/covid.svg";
import thumbnail from "../../assets/picture-thumbnail.svg";

const Welcome = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div class={styles.heading}>
          <Typography variant="h1">
            Hi Doctor! Welcome to the Application
          </Typography>
        </div>
        <div className={styles.para}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
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
      </div>
    </div>
  );
};
export default Welcome;
