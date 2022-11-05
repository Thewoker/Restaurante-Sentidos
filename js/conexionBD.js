// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAImsvG-Fa1OkFsFIwSwqopZj4Th8IKgko",
  authDomain: "restaurantesentidos-190d3.firebaseapp.com",
  databaseURL: "https://restaurantesentidos-190d3-default-rtdb.firebaseio.com",
  projectId: "restaurantesentidos-190d3",
  storageBucket: "restaurantesentidos-190d3.appspot.com",
  messagingSenderId: "11097423139",
  appId: "1:11097423139:web:c7faa94fc31c4b8f76a096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase();

console.log(app);
console.log(database);

export { app, database };