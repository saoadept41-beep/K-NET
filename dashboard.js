import { auth, db } from "./firebase.js";
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");

const chatRef = ref(db, "chat/global");

form.onsubmit = e => {
  e.preventDefault();
  if (!input.value) return;

  push(chatRef, {
    text: input.value,
    time: Date.now()
  });

  input.value = "";
};

onChildAdded(chatRef, snap => {
  const div = document.createElement("div");
  div.textContent = snap.val().text;
  messages.appendChild(div);
});


