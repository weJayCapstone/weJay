import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRE85AhiqgPdSW_aY7OhGf3Ev3F9uTTq4",
    authDomain: "wejay-254716.firebaseapp.com",
    databaseURL: "https://wejay-254716.firebaseio.com",
    storageBucket: "wejay-254716.appspot.com",
  };
export const firebaseApp = firebase.initializeApp(firebaseConfig);