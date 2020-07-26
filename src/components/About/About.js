import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <p>
        Disease Identification and Labeling (DIAL) is an Artificial Intelligence
        based application for image analysis and labeling to assist the doctors
        in predicting diseases. <br></br> <br />
        For example, lung Disease can be considered as the second most common
        type of disease for men and women. Many people die of lung disease such
        as lung cancer, Asthma, CPD (Chronic pulmonary disease) etc. in every
        year. Early prediction and detection of lung cancer can lessen the
        probability of deaths.
      </p>
    </div>
  );
};
export default About;
