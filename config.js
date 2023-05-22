import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXBRkckpAn0Y2Jv9qOjrzuF4zX3kqNB7s",
  authDomain: "chatapp-3bb41.firebaseapp.com",
  projectId: "chatapp-3bb41",
  storageBucket: "chatapp-3bb41.appspot.com",
  messagingSenderId: "762824295722",
  appId: "1:762824295722:web:4ded249900b67eab1f4a53",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = firebase.auth();
export { firebase };
