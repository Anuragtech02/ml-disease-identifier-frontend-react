import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBDdeiaGSBtD1jLYk_21-1HwoX8mdvfhT8",
  authDomain: "lungs-xray.firebaseapp.com",
  projectId: "lungs-xray",
  storageBucket: "lungs-xray.appspot.com",
  messagingSenderId: "908584438858",
  appId: "1:908584438858:web:b9ceb0a1720722ef85aab3",
  measurementId: "G-X290107LFL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
