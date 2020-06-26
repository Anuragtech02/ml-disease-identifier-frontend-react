import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import classNames from "classnames";

const LoginSignup = () => {
  const [mutable, setMutable] = useState(styles.nothing);

  const handleSignup = () => {
    setMutable(styles.rightPanelActive);
  };

  const handleLogin = () => {
    setMutable(styles.nothing);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={classNames(styles.container, mutable)}>
        <div
          className={classNames(styles.formContainer, styles.signUpContainer)}
        >
          <form action="#">
            <span className={styles.ca}>
              <h1>Create Account</h1>
            </span>

            <div className={classNames(styles.createAccountForm)}>
              <div class={styles.textFields}>
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Username"
                  variant="outlined"
                />
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  className={styles.inputFieldSignup}
                  size="small"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </div>
              <div class={styles.nextBtn}>
                <Button className={styles.btnPrimaryColor} variant="contained">
                  Next
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div
          className={classNames(styles.formContainer, styles.signInContainer)}
        >
          <form>
            <h1>Doctor Login</h1>
            <div class={styles.textFields}>
              <TextField
                className={styles.inputField}
                size="small"
                label="Username"
                variant="outlined"
              />
              <TextField
                className={styles.inputField}
                size="small"
                label="Password"
                variant="outlined"
                type="password"
              />
            </div>
            <div className={styles.loginBtn}>
              <h4 className={styles.forgot}>
                <Link className={styles.noDecoration} to="/forgotPassword">
                  Forgot Password?
                </Link>
              </h4>

              <Link className={styles.noDecoration} to="/welcome">
                <Button className={styles.btnPrimaryColor} variant="contained">
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>

        <div className={classNames(styles.overlayContainer)}>
          <div className={styles.overlay}>
            <div
              className={classNames(styles.overlayPanel, styles.overlayLeft)}
            >
              <h1>Hello User!</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Expedita aperiam, totam placeat nihil iure perferendis, ad quis
                doloremque, recusandae sapiente voluptate a voluptates odio modi
                aliquam laudantium qui. Odit, fuga.
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
              <h1>Hello User!</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                molestias perferendis repellendus. Ipsum, nesciunt fugit iste
                expedita quam ducimus perferendis repudiandae? Corrupti nisi
                ipsa at omnis voluptates magni, quia perspiciatis.
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
    </div>
  );
};

export default LoginSignup;
