import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const sphere = document.getElementById("sphere");
const mainScreen = document.getElementById("main-screen");
const authPanel = document.getElementById("auth-panel");

sphere.addEventListener("click", () => {
  mainScreen.classList.add("hidden");
  authPanel.classList.add("show");
});

const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("role");
const error = document.getElementById("error");

document.getElementById("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    window.location.href = "./dashboard.html";
  } catch (e) {
    error.textContent = e.message;
  }
};

document.getElementById("registerBtn").onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    window.location.href = "./dashboard.html";
  } catch (e) {
    error.textContent = e.message;
  }
};


