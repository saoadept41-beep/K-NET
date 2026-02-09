import { db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const messages = document.getElementById("messages");
const input = document.getElementById("msg");

onSnapshot(collection(db, "messages"), snap => {
  messages.innerHTML = "";
  snap.forEach(doc => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = doc.data().text;
    messages.appendChild(div);
  });
});

send.onclick = async () => {
  if (!input.value) return;
  await addDoc(collection(db,"messages"), {
    text: input.value,
    time: Date.now()
  });
  input.value = "";
};

