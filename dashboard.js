import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");

const chatId = "global"; // позже сделаем роли

const q = query(
  collection(db, "chats", chatId, "messages"),
  orderBy("createdAt")
);

onSnapshot(q, snapshot => {
  messages.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<span>${data.email}</span>: ${data.text}`;
    messages.appendChild(div);
  });
  messages.scrollTop = messages.scrollHeight;
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!input.value.trim()) return;

  await addDoc(collection(db, "chats", chatId, "messages"), {
    text: input.value,
    email: auth.currentUser.email,
    createdAt: serverTimestamp()
  });

  input.value = "";
});


