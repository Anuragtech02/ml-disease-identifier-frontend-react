import React, { useState, useEffect } from "react";
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
  IconButton,
  TextField,
  Tooltip,
  Avatar,
  Divider,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router";
import ChatIcon from "@material-ui/icons/Chat";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { AddCircleRounded } from "@material-ui/icons";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SearchIcon from "@material-ui/icons/Search";
import patient1 from "../../assets/Patients/patient1.jpg";
import patient2 from "../../assets/Patients/patient2.jpg";
import patient3 from "../../assets/Patients/patient3.jpg";
import classNames from "classnames";
import { SelectDM } from "../../components";

const Doctor = ({ history }) => {
  const [patientSearch, setPatientSearch] = useState("");

  const date = new Date();

  const patients = [
    {
      name: "Sample Patient",
      disease: "Covid",
      image: patient1,
      id: "ABC123",
      info: {
        age: 27,
        gender: "Female",
        address: "Indore, Madhya Pradesh",
        contact: 9876543210,
      },
      diagnosis: [
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
      ],
    },
    {
      name: "Random Patient",
      disease: "Disease",
      image: patient2,
      id: "ABC456",
      info: {
        age: 27,
        gender: "Female",
        address: "Indore, Madhya Pradesh",
        contact: 9876543210,
      },
      diagnosis: [
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
      ],
    },
    {
      name: "Simple Patient",
      disease: "Problem",
      image: patient3,
      id: "ABC789",
      info: {
        age: 27,
        gender: "Female",
        address: "Indore, Madhya Pradesh",
        contact: 9876543210,
      },
      diagnosis: [
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
      ],
    },
    {
      name: "Sample Patient",
      disease: "Covid",
      image: patient1,
      id: "BCD123",
      info: {
        age: 27,
        gender: "Female",
        address: "Indore, Madhya Pradesh",
        contact: 9876543210,
      },
      diagnosis: [
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
      ],
    },
    {
      name: "Random Patient",
      disease: "Disease",
      image: patient2,
      id: "BCD456",
      info: {
        age: 27,
        gender: "Female",
        address: "Indore, Madhya Pradesh",
        contact: 9876543210,
      },
      diagnosis: [
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
      ],
    },
    {
      name: "Simple Patient",
      disease: "Problem",
      image: patient3,
      id: "BCD789",
      info: {
        age: 27,
        gender: "Female",
        address: "Indore, Madhya Pradesh",
        contact: 9876543210,
      },
      diagnosis: [
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
        {
          name: "Referred Lab",
          date: `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`,
        },
      ],
    },
  ];

  const { patientId } = useParams();

  const dataById = patients.filter((patient) => patient.id === patientId);

  return (
    <div className={styles.container}>
      <Grid spacing={0} container className={styles.gridContainer}>
        <Grid item xs={12} s={6} md={4} lg={4} xl={3}>
          <div className={styles.sidebar}>
            <Paper className={styles.controlContainer}>
              <div className={styles.control}>
                <Tooltip placement="top" title="Add new patient">
                  <IconButton className={styles.icon}>
                    <CreateNewFolderIcon fontSize="default" />
                  </IconButton>
                </Tooltip>
                <Tooltip placement="top" title="Patients">
                  <IconButton className={styles.icon}>
                    <PermContactCalendarIcon fontSize="default" />
                  </IconButton>
                </Tooltip>
                <Tooltip placement="top" title="Chats">
                  <IconButton className={styles.icon}>
                    <ChatIcon fontSize="default" />
                  </IconButton>
                </Tooltip>
                <Tooltip placement="top" title="Notifications">
                  <IconButton className={styles.icon}>
                    <NotificationsIcon fontSize="default" />
                  </IconButton>
                </Tooltip>
              </div>
            </Paper>
            <Paper className={styles.actionPanel}>
              <div className={styles.addNew}>
                <h3>Add New</h3>
                <IconButton className={styles.icon}>
                  <AddCircleRounded />
                </IconButton>
              </div>
              <div className={styles.heading}>
                <h2>Patients</h2>
              </div>
              <div className={styles.search}>
                <SearchIcon />
                <input
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className={styles.patientList}>
                {patients.map((patient, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        history.push(`/doctor/patients/${patient.id}`)
                      }
                      className={classNames(
                        styles.patientContainer,
                        patientId === patient.id ? styles.selected : null
                      )}
                    >
                      <div
                        className={styles.profile}
                        style={{ backgroundImage: `url(${patient.image})` }}
                      ></div>
                      <div className={styles.nameDisease}>
                        <div className={styles.name}>
                          <strong>
                            <p>{patient.name}</p>
                          </strong>
                        </div>
                        <div className={styles.disease}>
                          <p>{patient.disease}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} s={6} md={8} lg={8} xl={9}>
          <PatientDetails
            history={history}
            patientId={patientId}
            data={dataById[0]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Doctor);

const ComponentToRender = ({ component: Component, props }) => {
  return (
    <div style={{ height: "100%", width: "100%", padding: "20px" }}>
      <Component {...props} />
    </div>
  );
};

const PatientDetails = ({ history, patientId, data }) => {
  const [component, setComponent] = useState({
    component: PatientData,
    props: { data },
  });

  useEffect(() => {
    switch (history.location.pathname) {
      case `/doctor/patients/${patientId}`:
        setComponent({
          component: PatientData,
          props: { data },
        });
        break;
      case `/doctor/patients/${patientId}/select`:
        setComponent({
          component: SelectDM,
          props: null,
        });
        break;
      default:
        setComponent({
          component: PatientData,
          props: { data },
        });
        // setComponent(PatientData);
        break;
    }
  }, [history, patientId, data]);

  return (
    <Paper className={styles.patientDetails}>
      <div className={styles.header}>
        <div className={styles.name}>
          <Avatar
            style={{ width: "80px", height: "80px" }}
            className={styles.avatar}
            src={data.image}
          >
            {data.name.slice(2, data.name.length - 1)}
          </Avatar>
          <div className={styles.intro}>
            <h4>{data.name}</h4>
            <p>{data.disease}</p>
          </div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.chat}>
            <Tooltip placement="top" title="Chat">
              <IconButton>
                <ChatIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classNames(styles.chat)}>
            <Tooltip placement="top" title="Assessment">
              <IconButton
                onClick={() => {
                  history.push(`/doctor/patients/${data.id}/select`);
                }}
              >
                <AssessmentIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <ComponentToRender
        component={component.component}
        props={component.props}
      />
      {/* <PatientData data={data} /> */}
    </Paper>
  );
};

const Dashboard = () => {
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
        <TableContainer className={styles.tableContainer} component={Paper}>
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
  );
};

const PatientData = ({ data }) => {
  return (
    <>
      <div className={styles.diagnosisHeading}>
        <h3>Latest Diagnosis</h3>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.latest}>
        {data.diagnosis.map((item, i) => {
          return (
            <div
              key={i}
              style={{ marginLeft: i ? "20px" : "0" }}
              className={styles.latestDiagnosis}
            >
              <h4>{item.name}</h4>
              <p>{item.date}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.infoHeading}>
        <h3>Information</h3>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.info}>
        <ul>
          <li>
            Age <span>{data.info.age}</span>
          </li>
          <div className={styles.divider}></div>

          <li>
            Gender <span>{data.info.gender}</span>
          </li>
          <div className={styles.divider}></div>

          <li>
            Contact <span>{data.info.contact}</span>
          </li>
          <div className={styles.divider}></div>

          <li>
            Address <span>{data.info.address}</span>
          </li>
          <div className={styles.divider}></div>
        </ul>
      </div>
    </>
  );
};
