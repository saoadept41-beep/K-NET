// js/auth.js
import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm.onsubmit = async e => {
  e.preventDefault();
  await signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
  location.href = "dashboard.html";
};

registerForm.onsubmit = async e => {
  e.preventDefault();
  const cred = await createUserWithEmailAndPassword(
    auth,
    regEmail.value,
    regPassword.value
  );

  await setDoc(doc(db, "users", cred.user.uid), {
    email: regEmail.value,
    role: role.value
  });

  location.href = "dashboard.html";
};




