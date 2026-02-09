import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const sphere = document.getElementById("sphere");
const main = document.getElementById("main-screen");
const authPanel = document.getElementById("auth-panel");

sphere.onclick = () => {
  main.classList.add("hidden");
  authPanel.classList.add("show");
};

loginForm.onsubmit = e => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then(() => location.href = "dashboard.html")
    .catch(err => error.textContent = err.message);
};

registerForm.onsubmit = e => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value)
    .then(() => location.href = "dashboard.html")
    .catch(err => error.textContent = err.message);
};

loginTab.onclick = () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};

registerTab.onclick = () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};
