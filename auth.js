import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const sphere = document.getElementById("sphere");
  const panel = document.getElementById("auth-panel");

  sphere.onclick = () => {
    panel.classList.add("show");
  };

  loginForm.onsubmit = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then(() => location.href = "dashboard.html")
      .catch(err => errorMessage.textContent = err.message);
  };

  registerForm.onsubmit = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value)
      .then(() => location.href = "dashboard.html")
      .catch(err => errorMessage.textContent = err.message);
  };

});



