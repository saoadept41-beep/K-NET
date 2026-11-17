import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const $ = id => document.getElementById(id);

const intro = $("intro");
const authPanel = $("auth-panel");
const loginForm = $("loginForm");
const registerForm = $("registerForm");
const message = $("authMessage");
const tabsBox = document.querySelector(".tabs");
const tabs = document.querySelectorAll(".tabs button");

/* ---------- Интро ---------- */
intro.addEventListener("click", () => {
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    authPanel.classList.add("visible");
  }, 600);
});

/* ---------- Сообщения ---------- */
const showError = text => { message.textContent = text; };
const clearError = () => { message.textContent = ""; };

/* ---------- Переключение LOGIN / REGISTER с анимацией ---------- */
function switchTab(type) {
  clearError();

  const isLogin = type === "login";
  const current = isLogin ? registerForm : loginForm;
  const next = isLogin ? loginForm : registerForm;

  if (next.classList.contains("active")) return;

  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === type));
  tabsBox.dataset.active = type;

  current.classList.remove("active", "from-left");

  // сброс анимации, чтобы она проигрывалась при каждом переключении
  next.classList.remove("active", "from-left");
  void next.offsetWidth;
  next.classList.add("active");
  if (isLogin) next.classList.add("from-left");
}

tabs.forEach(tab => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));

/* ---------- LOGIN ---------- */
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

/* ---------- REGISTER ---------- */
registerForm.addEventListener("submit", async e => {
  e.preventDefault();
  clearError();

  const email = $("regEmail").value.trim();
  const password = $("regPassword").value;
  const confirm = $("confirmPassword").value;

  if (password.length < 6) return showError("Пароль должен содержать минимум 6 символов");
  if (password !== confirm) return showError("Пароли не совпадают");

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);

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
