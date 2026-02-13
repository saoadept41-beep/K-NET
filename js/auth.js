// js/auth.js
import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {

  // ===== DOM =====
  const sphere = document.getElementById("sphere");
  const authPanel = document.getElementById("auth-panel");

  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");
  const roleSelect = document.getElementById("role");

  const errorBox = document.getElementById("error-message");

  // ===== UI =====
  sphere.onclick = () => {
    authPanel.classList.add("show");
  };

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

  // ===== LOGIN =====
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail.value,
        loginPassword.value
      );
      window.location.href = "dashboard.html";
    } catch (err) {
      showError(err.message);
    }
  });

  // ===== REGISTER =====
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        regEmail.value,
        regPassword.value
      );

      await set(ref(db, "users/" + cred.user.uid), {
        email: regEmail.value,
        role: roleSelect.value,
        createdAt: Date.now()
      });

      window.location.href = "dashboard.html";
    } catch (err) {
      showError(err.message);
    }
  });

  // ===== ERROR =====
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add("show");
  }

  function clearError() {
    errorBox.textContent = "";
    errorBox.classList.remove("show");
  }

});


