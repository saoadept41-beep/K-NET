import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const sphere = document.getElementById("sphere");
const authPanel = document.getElementById("auth-panel");

sphere.onclick = () => {
  authPanel.classList.add("show");
};

loginTab.onclick = () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};

registerTab.onclick = () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();
  await signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
  window.location.href = "dashboard.html";
};

registerForm.onsubmit = async (e) => {
  e.preventDefault();
  await createUserWithEmailAndPassword(
    auth,
    regEmail.value,
    regPassword.value
  );
  window.location.href = "dashboard.html";
};
