import React from "react";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <Paper className={styles.navContainer}>
        <div class={styles.logo}>
          <h2>aaiway</h2>
        </div>
        <ul class={styles.navLinks}>
          <li className={styles.navLink}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navLink}>
            <Link to="/about">About</Link>
          </li>
          <li className={styles.navLink}>Account</li>
        </ul>
      </Paper>
    </nav>
  );
};

export default NavBar;
