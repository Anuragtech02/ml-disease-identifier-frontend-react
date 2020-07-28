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
  appId: "1:685530286068:web:f9f7ba5c5c92bbde525ba1",
  measurementId: "G-S4BQQYSMM3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
