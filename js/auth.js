import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const boot = document.getElementById("boot-screen");
const authPanel = document.getElementById("auth-panel");

boot.onclick = () => {
  boot.style.display = "none";
  authPanel.classList.remove("hidden");
};

document.getElementById("login").onclick = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    location.href = "dashboard.html";
  } catch (e) {
    error.innerText = e.message;
  }
};

document.getElementById("register").onclick = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      email: email.value,
      role: role.value
    });

    location.href = "dashboard.html";
  } catch (e) {
    error.innerText = e.message;
  }
};


