import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* === UI === */
const sphere = document.getElementById("sphere");
const mainScreen = document.getElementById("main-screen");
const authPanel = document.getElementById("auth-panel");

sphere.addEventListener("click", () => {
  mainScreen.classList.add("hidden");
  authPanel.classList.add("show");
});

/* Tabs */
loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};

registerTab.onclick = () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};

/* Login */
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  ).then(() => {
    window.location.href = "dashboard.html";
  }).catch(err => {
    errorMessage.textContent = err.message;
  });
});

/* Register */
registerForm.addEventListener("submit", e => {
  e.preventDefault();
  createUserWithEmailAndPassword(
    auth,
    regEmail.value,
    regPassword.value
  ).then(user => {
    return set(ref(db, "users/" + user.user.uid), {
      email: regEmail.value,
      role: role.value
    });
  }).then(() => {
    window.location.href = "dashboard.html";
  }).catch(err => {
    errorMessage.textContent = err.message;
  });
});


