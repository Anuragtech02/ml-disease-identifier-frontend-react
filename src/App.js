import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import { NavBar, About, LoginSignup } from "./components";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <LoginSignup />
  </div>
);

export default App;
