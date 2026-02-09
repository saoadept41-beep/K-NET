import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const boot = document.getElementById("boot-screen");
const authPanel = document.getElementById("auth-panel");

boot.addEventListener("click", () => {
  boot.classList.add("hidden");
  authPanel.classList.remove("hidden");
});

document.getElementById("loginBtn").onclick = async () => {
  const email = email.value;
  const password = password.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (e) {
    document.getElementById("error").innerText = e.message;
  }
};


