import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAZwTxE00KpeF0b7uSevXZ-XjlUeOGEW6c",
  authDomain: "lungsxrayfb.firebaseapp.com",
  databaseURL: "https://lungsxrayfb.firebaseio.com",
  projectId: "lungsxrayfb",
  storageBucket: "lungsxrayfb.appspot.com",
  messagingSenderId: "685530286068",
  appId: "1:685530286068:web:83ef99e6c3a45f8f525ba1",
  measurementId: "G-9YPHBEY157",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
