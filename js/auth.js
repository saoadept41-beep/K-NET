
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

  const $ = id => document.getElementById(id);

  const loginTab = $("loginTab");
  const registerTab = $("registerTab");
  const loginForm = $("loginForm");
  const registerForm = $("registerForm");
  const authPanel = $("auth-panel");
  const errorBox = $("error-message");

  function showError(message) {
    errorBox.textContent = message;
    errorBox.classList.add("show");
  }

  function clearError() {
    errorBox.textContent = "";
    errorBox.classList.remove("show");
  }

  function switchTab(type) {
    clearError();

    const isLogin = type === "login";

    loginTab.classList.toggle("active", isLogin);
    registerTab.classList.toggle("active", !isLogin);

    loginForm.classList.toggle("hidden", !isLogin);
    registerForm.classList.toggle("hidden", isLogin);
  }

  loginTab.addEventListener("click", () => switchTab("login"));
  registerTab.addEventListener("click", () => switchTab("register"));

  $("sphere")?.addEventListener("click", () => {
    authPanel.classList.add("show");
  });

  $("closeAuth")?.addEventListener("click", () => {
    authPanel.classList.remove("show");
  });

  // LOGIN
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    clearError();

    try {
      await signInWithEmailAndPassword(
        auth,
        $("loginEmail").value.trim(),
        $("loginPassword").value
      );

      location.href = "dashboard.html";

    } catch (error) {
      console.error(error);
      showError(getMessage(error));
    }
  });

  // REGISTER
  registerForm.addEventListener("submit", async e => {
    e.preventDefault();
    clearError();

    const email = $("regEmail").value.trim();
    const password = $("regPassword").value;
    const confirm = $("confirmPassword").value;

    if (password.length < 6) {
      showError("Пароль должен содержать минимум 6 символов");
      return;
    }

    if (password !== confirm) {
      showError("Пароли не совпадают");
      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await set(ref(db, "users/" + credential.user.uid), {
        email,
        role: "user",
        createdAt: Date.now()
      });

      location.href = "dashboard.html";

    } catch (error) {
      console.error(error);
      showError(getMessage(error));
    }
  });

  function getMessage(error) {
    const messages = {
      "auth/invalid-email": "Неверный Email",
      "auth/invalid-credential": "Неверный Email или пароль",
      "auth/email-already-in-use": "Email уже зарегистрирован",
      "auth/weak-password": "Слишком слабый пароль",
      "auth/too-many-requests": "Слишком много попыток",
      "auth/network-request-failed": "Проверь интернет-соединение",
      "PERMISSION_DENIED": "Нет доступа к Firebase Database"
    };

    return messages[error.code] || "Ошибка: " + error.message;
  }

  console.log("K-NET AUTH READY");
});


