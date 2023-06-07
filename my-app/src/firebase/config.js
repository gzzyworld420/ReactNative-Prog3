import app from 'firebase/app';
import firebase from 'firebase';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCt4WVNALgW42E5F4ON4ckeUdFDoJJ06D4",
    authDomain: "proyecto-integrador-d0a35.firebaseapp.com",
    projectId: "proyecto-integrador-d0a35",
    storageBucket: "proyecto-integrador-d0a35.appspot.com",
    messagingSenderId: "995019175844",
    appId: "1:995019175844:web:c41f01ad30a88f8d83b331"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();