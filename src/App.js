import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import {
  NavBar,
  About,
  LoginSignup,
  Welcome,
  SelectDM,
  Doctor,
} from "./components";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/welcome" component={Welcome} />
          <div
            style={{
              width: "100%",
              height: "92vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Route exact path="/doctor" component={Doctor} />
            <Route
              exact
              path="/doctor/patients/:patientId"
              component={Doctor}
            />
            <Route
              exact
              path="/doctor/patients/:patientId/select"
              component={Doctor}
            />
            <Route
              exact
              path="/doctor/patients/:patientId/benchmark"
              component={Doctor}
            />
          </div>
        </Switch>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className={styles.page}>
    <LoginSignup />
  </div>
);

export default App;
