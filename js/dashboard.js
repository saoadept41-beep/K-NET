import { auth, db } from "./firebase.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// db — это Realtime Database (getDatabase), поэтому Firestore здесь не работает
import {
  ref,
  push,
  query,
  orderByChild,
  onChildAdded,
  off
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const logoutBtn = document.getElementById("logoutBtn");
const sendForm = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

let currentChat = "global";
let currentQuery = null;

onAuthStateChanged(auth, user => {
  if (!user) location.href = "index.html";
});

logoutBtn.onclick = () => signOut(auth);

/* Подписка на выбранный чат */
function openChat(name) {
  if (currentQuery) off(currentQuery);
  currentChat = name;
  messagesDiv.innerHTML = "";

  currentQuery = query(ref(db, "messages/" + name), orderByChild("createdAt"));

  onChildAdded(currentQuery, snap => {
    const data = snap.val();
    const div = document.createElement("div");
    div.className = "message";

    const author = document.createElement("strong");
    author.textContent = data.user;          // textContent вместо innerHTML — защита от XSS
    div.append(author, document.createElement("br"), data.text);

    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

document.querySelectorAll(".nav-btn[data-chat]").forEach(btn =>
  btn.addEventListener("click", () => openChat(btn.dataset.chat))
);

/* Отправка */
sendForm.addEventListener("submit", async e => {
  e.preventDefault();

  const text = messageInput.value.trim();
  if (!text || !auth.currentUser) return;

  await push(ref(db, "messages/" + currentChat), {
    text,
    user: auth.currentUser.email,
    createdAt: Date.now()
  });

  messageInput.value = "";
});

openChat("global");


