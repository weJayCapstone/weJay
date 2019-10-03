import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRE85AhiqgPdSW_aY7OhGf3Ev3F9uTTq4",
    authDomain: "wejay-254716.firebaseapp.com",
    projectId: "wejay-254716",
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;