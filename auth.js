import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const errorBox = document.getElementById("error-message");

document.getElementById("loginTab").onclick = () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};

document.getElementById("registerTab").onclick = () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};

loginForm.onsubmit = e => {
  e.preventDefault();

  signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  )
  .then(() => location.href = "dashboard.html")
  .catch(err => errorBox.textContent = err.message);
};

registerForm.onsubmit = e => {
  e.preventDefault();

  createUserWithEmailAndPassword(
    auth,
    regEmail.value,
    regPassword.value
  )
  .then(user => {
    set(ref(db, "users/" + user.user.uid), {
      email: regEmail.value,
      role: role.value
    });
    location.href = "dashboard.html";
  })
  .catch(err => errorBox.textContent = err.message);
};

