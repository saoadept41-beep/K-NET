import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwh_V0jTicgXh7enrzbMXM4_78JgYY9UY",
  authDomain: "k-net-83161.firebaseapp.com",
  databaseURL: "https://k-net-83161-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "k-net-83161",
  storageBucket: "k-net-83161.firebasestorage.app",
  messagingSenderId: "1093304648278",
  appId: "1:1093304648278:web:5a325e951273bb9f04b1f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

console.log("🔥 Firebase initialized");
