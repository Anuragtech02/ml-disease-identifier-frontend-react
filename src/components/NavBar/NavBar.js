import React from "react";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <Paper className={styles.navContainer}>
        <div className={styles.outerNav}>
          <div className={styles.logo}>
            <h2>
              <Link className={styles.noDecoration} to="/">
                aaiway
              </Link>
            </h2>
          </div>
          <ul className={styles.navLinks}>
            <li className={styles.navLink}>
              <Link className={styles.noDecoration} to="/">
                Home
              </Link>
            </li>
            <li className={styles.navLink}>
              <Link className={styles.noDecoration} to="/about">
                About
              </Link>
            </li>
            <li className={styles.navLink}>Account</li>
          </ul>
        </div>
      </Paper>
    </nav>
  );
};

export default NavBar;
