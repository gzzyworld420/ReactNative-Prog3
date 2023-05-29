import app from 'firebase/app';
import firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();