import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const messages = document.getElementById("messages");

const q = query(collection(db, "chat"), orderBy("time"));

onSnapshot(q, snap => {
  messages.innerHTML = "";
  snap.forEach(doc => {
    const d = doc.data();
    messages.innerHTML += `<div class="msg"><b>${d.user}</b>: ${d.text}</div>`;
  });
});

chatForm.addEventListener("submit", async e => {
  e.preventDefault();
  await addDoc(collection(db, "chat"), {
    text: messageInput.value,
    user: auth.currentUser.email,
    time: Date.now()
  });
  messageInput.value = "";
});
