import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
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

            <span style={{ paddingTop: "15px" }}>
              Or Use Your Email For Registration
            </span>
            <div className={classNames(styles.createAccountForm)}>
              <TextField label="Username" variant="outlined" />
              <TextField label="Email" variant="outlined" />
              <TextField label="Password" variant="outlined" type="password" />
              <Button variant="contained">Next</Button>
            </div>
          </form>
        </div>

        <div
          className={classNames(styles.formContainer, styles.signInContainer)}
        >
          <form>
            <h1>Doctor Login</h1>
            <TextField label="Username" variant="outlined" />
            <TextField label="Password" variant="outlined" type="password" />
            <Button variant="contained">Login</Button>
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
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
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
              <Button variant="contained" onClick={handleSignup}>
                Signup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
