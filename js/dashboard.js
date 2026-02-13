import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, push, onChildAdded, get, off } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messages = document.getElementById("messages");
const sendForm = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");
const logoutBtn = document.getElementById("logoutBtn");

let currentChat = "global";
let role = "global";
let chatRef = null;

onAuthStateChanged(auth, async user => {
  if (!user) location.href = "index.html";

  const snap = await get(ref(db, "users/" + user.uid));
  role = snap.val()?.role || "global";

  switchChat("global");
});

/* SEND */
sendForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!messageInput.value.trim()) return;

  push(ref(db, "chats/" + currentChat), {
    text: messageInput.value,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  messageInput.value = "";
});

/* NAVIGATION */
document.querySelectorAll("[data-chat]").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.chat;
    switchChat(type === "role" ? role : type);
  });
});

/* SWITCH CHAT */
function switchChat(chatName) {
  messages.innerHTML = "";

  if (chatRef) off(chatRef);

  currentChat = chatName;
  chatRef = ref(db, "chats/" + currentChat);

  onChildAdded(chatRef, snap => {
    const data = snap.val();
    const div = document.createElement("div");

    div.className = "message " + (data.uid === auth.currentUser.uid ? "me" : "other");
    div.textContent = data.text;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

/* LOGOUT */
logoutBtn.onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};


