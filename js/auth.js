import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const sphere = document.getElementById("sphere");
const main = document.getElementById("main-screen");
const authPanel = document.getElementById("auth-panel");

sphere.addEventListener("click", () => {
  main.classList.add("hidden");
  setTimeout(() => authPanel.classList.add("show"), 600);
});

/* LOGIN */
loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
    window.location.href = "dashboard.html";
  } catch (err) {
    error.innerText = err.message;
  }
});

/* REGISTER */
registerForm.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      regEmail.value,
      regPassword.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      email: regEmail.value,
      role: role.value,
      createdAt: Date.now()
    });

    window.location.href = "dashboard.html";
  } catch (err) {
    error.innerText = err.message;
  }
});


