import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import styles from "./NotFound.module.css";

const NotFound = ({ history }) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (!timer) history.push("/");
    setTimeout(() => {
      if (timer) setTimer((curr) => curr - 1);
    }, 1000);
  }, [timer, history]);

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h5>Seems like you're lost :(</h5>
      <h5>Redirecting to homepage in {timer}</h5>
    </div>
  );
};

export default withRouter(NotFound);
