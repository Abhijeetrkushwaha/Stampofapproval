import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBLULt1U448mgK7NlYUiG3o8SrtT2_AvMI",
  authDomain: "stamp-of-approval-43eda.firebaseapp.com",
  projectId: "stamp-of-approval-43eda",
  storageBucket: "stamp-of-approval-43eda.appspot.com",
  messagingSenderId: "765965211731",
  appId: "1:765965211731:web:6459e5b34ee681ad1c8ea6",
  measurementId: "G-15YSDHSTLG"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };