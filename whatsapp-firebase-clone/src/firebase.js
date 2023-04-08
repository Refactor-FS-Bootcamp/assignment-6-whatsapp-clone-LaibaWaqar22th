import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBsQ94tSdEUE3BBRv0VkpHYzWRrGTujVJ4",
    authDomain: "whatsapp-firebase-clone-1bb02.firebaseapp.com",
    projectId: "whatsapp-firebase-clone-1bb02",
    storageBucket: "whatsapp-firebase-clone-1bb02.appspot.com",
    messagingSenderId: "219281496009",
    appId: "1:219281496009:web:3feb8a796f795489abfa18"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider }  