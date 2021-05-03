import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDfUUOdCFKvDCpyHbDJu9rTFTGDKSSB0TE",
    authDomain: "buddy-chat-9c562.firebaseapp.com",
    projectId: "buddy-chat-9c562",
    storageBucket: "buddy-chat-9c562.appspot.com",
    messagingSenderId: "381406664200",
    appId: "1:381406664200:web:482585b6181f4c081223bd"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;