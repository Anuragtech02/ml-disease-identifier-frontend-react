import React from "react";
import styles from "./Doctor.module.css";
import {
  Paper,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
} from "@material-ui/core";

const Doctor = () => {
  const createData = (name, regDate, xStatus, predictedDisease, lab) => {
    return { name, regDate, xStatus, predictedDisease, lab };
  };

  const tempData = [
    createData("Patient ABC", "May 1 2020", "Not done", "NIL", "No Lab"),
    createData(
      "Patient DEF",
      "June 2 2020",
      "Done",
      "Covid-19",
      "Health Lab 123"
    ),
    createData("Patient GHI", "June 10 2020", "Not done", "NIL", "No Lab"),
    createData("Patient JKL", "May 11 2020", "Done", "NIL", "Health Lab 123"),
    createData("Patient MNO", "June 1 2020", "Not done", "NIL", "No Lab"),
    createData("Patient XYZ", "June 14 2020", "Not done", "NIL", "No Lab"),
  ];

  return (
    <div className={styles.container}>
      <Paper className={styles.sidebar}>
        <div className={styles.profile}></div>
        <div className={styles.details}>
          <h1>Doctor Name</h1>
        </div>
      </Paper>
      <Paper className={styles.dashboard}>
        <h1>My Patients</h1>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table size="small" className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>X-Ray Status</TableCell>
                <TableCell>Predicted Disease</TableCell>
                <TableCell>Laboratory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempData.map((data) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>{data.regDate}</TableCell>
                  <TableCell>{data.xStatus}</TableCell>
                  <TableCell>{data.predictedDisease}</TableCell>
                  <TableCell>{data.lab}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Doctor;
