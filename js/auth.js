import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const sphere = document.getElementById("sphere");
const mainScreen = document.getElementById("main-screen");
const authPanel = document.getElementById("auth-panel");

sphere.addEventListener("click", () => {
  mainScreen.classList.add("fade-out");
  setTimeout(() => {
    mainScreen.style.display = "none";
    authPanel.classList.remove("hidden");
  }, 600);
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (e) {
    document.getElementById("error-message").textContent =
      "Erreur de connexion";
  }
});


    location.href = "dashboard.html";
  } catch (e) {
    error.innerText = e.message;
  }
};


