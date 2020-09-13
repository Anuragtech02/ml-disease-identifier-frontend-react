import React from "react";
import styles from "./Doctor.module.css";
import {
  Paper,
  Button,
  Card,
  Grid,
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

  const statsData = [
    {
      heading: "Total Patients",
      count: 24,
      selected: true,
    },
    {
      heading: "Covid Patients",
      count: 18,
      selected: false,
    },
    {
      heading: "X-Rays Done",
      count: 11,
      selected: false,
    },
  ];

  return (
    <div className={styles.container}>
      <Grid spacing={4} container>
        <Grid item xs={12} s={4} md={3} lg={3} xl={3}>
          <Paper className={styles.sidebar}>
            <div className={styles.profile}></div>
            <div className={styles.details}>
              <div className={styles.name}>
                <h1>Doctor Name</h1>
                <h2>Covid Specialist</h2>
              </div>
              <div className={styles.about}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat mollitia molestias expedita nobis, beatae nulla
                  voluptate impedit nisi corporis et, dolorem aliquid.
                  Accusantium excepturi similique, provident alias itaque
                  facilis unde.
                </p>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} s={9} md={9} lg={9} xl={9}>
          <Paper className={styles.dashboard}>
            <div className={styles.heading}>
              <h1>Dashboard</h1>
            </div>
            <div className={styles.stats}>
              <Grid spacing={4} container>
                {statsData.map((data) => (
                  <Grid key={data.heading} item xs={4} md={4} lg={4}>
                    <Card className={styles.stat}>
                      <h4>{data.heading}</h4>
                      <h1>{data.count}</h1>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className={styles.patients}>
              <h1>My Patients</h1>
              <TableContainer
                className={styles.tableContainer}
                component={Paper}
              >
                <Table size="medium" className={styles.table}>
                  <TableHead className={styles.tableHead}>
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
                      <TableRow key={data.name}>
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
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Doctor;
