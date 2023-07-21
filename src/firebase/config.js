import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9hh0cMtvz1CYVafz0Al2TCiZ_QoFJHRk",
    authDomain: "spot-control-99676.firebaseapp.com",
    projectId: "spot-control-99676",
    storageBucket: "spot-control-99676.appspot.com",
    messagingSenderId: "419512800568",
    appId: "1:419512800568:web:1523b68d379a2f5676ddcd"
  };

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };