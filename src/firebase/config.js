import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD412QJCqJhlanDrpKb6xCYSF23qWCkBq0",
  authDomain: "chat-app-company.firebaseapp.com",
  projectId: "chat-app-company",
  storageBucket: "chat-app-company.appspot.com",
  messagingSenderId: "676358756964",
  appId: "1:676358756964:web:948df13fa77fa2069fdd71",
  measurementId: "G-4JF0Y0FEXV"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === "localhost") {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
