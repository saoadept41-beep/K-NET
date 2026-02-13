import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, push, onChildAdded, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const sendForm = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");

let currentChat = "global";
let role = null;

onAuthStateChanged(auth, async user => {
  if (!user) location.href = "index.html";

  const snap = await get(ref(db, "users/" + user.uid));
  role = snap.val()?.role || "global";
  listen();
});

sendForm.onsubmit = e => {
  e.preventDefault();

  if (!messageInput.value.trim()) return;

  push(ref(db, "chats/" + currentChat), {
    text: messageInput.value,
    time: Date.now()
  });

  messageInput.value = "";
};

document.querySelectorAll("[data-chat]").forEach(btn => {
  btn.onclick = () => {
    currentChat = btn.dataset.chat === "role" ? role : btn.dataset.chat;
    messages.innerHTML = "";
    listen();
  };
});

function listen() {
  messages.innerHTML = "";
  onChildAdded(ref(db, "chats/" + currentChat), snap => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = snap.val().text;
    messages.appendChild(div);
  });
}


