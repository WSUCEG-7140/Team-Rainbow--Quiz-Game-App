import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyBgOhcvBsuotxA8kWcOjntPcFWXvYLKLZc",
  authDomain: "quiz-app-7c059.firebaseapp.com",
  projectId: "quiz-app-7c059",
  storageBucket: "quiz-app-7c059.appspot.com",
  messagingSenderId: "88292485859"
};

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const firebaseApp = firebase;
const db = firebase.firestore();
const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export  { db, auth, facebookProvider, firebaseApp };
