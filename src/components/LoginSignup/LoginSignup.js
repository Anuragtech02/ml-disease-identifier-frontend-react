import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Link, Redirect, withRouter } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import classNames from "classnames";
import { motion } from "framer-motion";
import firebase from "../../Auth/firebase";
import { AuthContext } from "../../Auth/Auth";

const LoginSignup = ({ history }) => {
  const [mutableClass, setMutableClass] = useState(styles.nothing);
  const [category, setCategory] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [name, setName] = useState("");
  const [verification, setVerification] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");

  const handleSignup = () => {
    setMutableClass(styles.rightPanelActive);
  };

  const handleLogin = () => {
    setMutableClass(styles.nothing);
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(signupEmail, signupPass)
        .then(async () => {
          const db = firebase.firestore();
          const ref = db.collection("users");
          const id = ref.doc.id;
          await ref.doc(id).set({
            id,
            email: loginEmail,
            name: name,
            category: category,
            verification: verification,
          });
        })
        .then(() => {
          alert("User created succesfully :) ");
          history.push("/welcome");
        });
    } catch (error) {}
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass);
      history.push("/welcome");
    } catch (error) {
      alert(error);
    }
  };

  // const { userDetails } = useContext(AuthContext);

  // if (userDetails) {
  //   history.push("/welcome");
  //   return <Redirect to="/welcome" />;
  // }

  return (
    <motion.div
      className={styles.outerContainer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={classNames(styles.container, mutableClass)}>
        <div
          className={classNames(styles.formContainer, styles.signUpContainer)}
        >
          <form onSubmit={signupSubmit}>
            <span className={styles.ca}>
              <h1>Create Account</h1>
            </span>

            <div className={classNames(styles.createAccountForm)}>
              <div className={classNames(styles.textFields, styles.signupText)}>
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Full Name"
                  variant="outlined"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Email"
                  variant="outlined"
                  required
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  value={signupPass}
                  onChange={(e) => setSignupPass(e.target.value)}
                />
                <FormControl
                  className={styles.selectCategory}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel id="select-category">I'm a</InputLabel>
                  <Select
                    labelId="select-category"
                    label="I'm a"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="lab">Laboratory</MenuItem>
                    <MenuItem value="patient">Patient</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Verification"
                  variant="outlined"
                  type="text"
                  required
                  value={verification}
                  onChange={(e) => setVerification(e.target.value)}
                />
              </div>
              <div className={styles.nextBtn}>
                <Button
                  className={styles.btnPrimaryColor}
                  type="submit"
                  variant="contained"
                >
                  Next
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div
          className={classNames(styles.formContainer, styles.signInContainer)}
        >
          <form onSubmit={loginSubmit}>
            <h1>Login</h1>
            <div className={styles.textFields}>
              <TextField
                className={styles.inputField}
                size="small"
                label="Email"
                variant="outlined"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                className={styles.inputField}
                size="small"
                label="Password"
                variant="outlined"
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
            </div>
            <div className={styles.loginBtn}>
              <h4 className={styles.forgot}>
                <Link className={styles.noDecoration} to="/forgotPassword">
                  Forgot Password?
                </Link>
              </h4>

              <Button
                className={styles.btnPrimaryColor}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>

        <div className={classNames(styles.overlayContainer)}>
          <div className={styles.overlay}>
            <div
              className={classNames(styles.overlayPanel, styles.overlayLeft)}
            >
              <h1>Hello There!</h1>
              <p>
                Disease Identification and Labeling (DIAL) is an Artificial
                Intelligence based application for image analysis and labeling
                to assist the doctors in predicting diseases.
              </p>
              <div className={styles.overlayLogin}>
                <p>Already a member?</p>
                <Button
                  className={classNames(
                    styles.loginOverlayBtn,
                    styles.btnWhite
                  )}
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </div>
            <div
              className={classNames(styles.overlayPanel, styles.overlayRight)}
            >
              <h1>Hello There!</h1>
              <p>
                Disease Identification and Labeling (DIAL) is an Artificial
                Intelligence based application for image analysis and labeling
                to assist the doctors in predicting diseases.
              </p>
              <div className={styles.overlayLogin}>
                <p>Not a member?</p>
                <Button
                  className={classNames(
                    styles.loginOverlayBtn,
                    styles.btnWhite
                  )}
                  variant="contained"
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default withRouter(LoginSignup);
