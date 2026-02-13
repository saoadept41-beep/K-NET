import { auth, db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let currentChat = "global";

document.querySelectorAll("[data-chat]").forEach(btn => {
  btn.onclick = () => {
    currentChat = btn.dataset.chat;
    loadChat();
  };
});

function loadChat() {
  const q = query(
    collection(db, "chats", currentChat, "messages"),
    orderBy("time")
  );

  onSnapshot(q, snap => {
    messages.innerHTML = "";
    snap.forEach(doc => {
      const div = document.createElement("div");
      div.className = "msg";
      div.textContent = doc.data().text;
      messages.appendChild(div);
    });
  });
}

sendForm.onsubmit = async e => {
  e.preventDefault();
  await addDoc(
    collection(db, "chats", currentChat, "messages"),
    {
      text: messageInput.value,
      time: Date.now()
    }
  );
  messageInput.value = "";
};

loadChat();

