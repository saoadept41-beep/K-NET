// ===== FIREBASE =====
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// ===== UI ELEMENTS =====
const sphere = document.getElementById("sphere");
const mainScreen = document.getElementById("main-screen");
const authPanel = document.getElementById("auth-panel");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const errorBox = document.getElementById("error-message");


// ===== ОТКРЫТЬ АВТОРИЗАЦИЮ =====
sphere.addEventListener("click", () => {
  mainScreen.classList.add("hidden");
  authPanel.classList.add("show");
});


// ===== ТАБЫ =====
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});


// ===== LOGIN =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.style.display = "none";

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    showError(err.message);
  }
});


// ===== REGISTER =====
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.style.display = "none";

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("role").value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // сохраняем профиль
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      role,
      createdAt: new Date(),
    });

    window.location.href = "dashboard.html";
  } catch (err) {
    showError(err.message);
  }
});


// ===== ERROR =====
function showError(text) {
  errorBox.textContent = text;
  errorBox.style.display = "block";
}
