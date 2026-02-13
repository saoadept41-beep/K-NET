import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, push, onChildAdded, get, remove, off } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messages = document.getElementById("messages");
const sendForm = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");
const logoutBtn = document.getElementById("logoutBtn");

const profileBtn = document.getElementById("profileBtn");
const profileModal = document.getElementById("profileModal");
const closeProfile = document.getElementById("closeProfile");
const pName = document.getElementById("pName");
const pRole = document.getElementById("pRole");

let currentChat = "global";
let chatRef = null;
let currentUser = {};

onAuthStateChanged(auth, async user => {
  if (!user) location.href = "index.html";

  const snap = await get(ref(db, "users/" + user.uid));
  currentUser = snap.val();

  pName.textContent = currentUser.email;
  pRole.textContent = currentUser.role;

  switchChat("global");
});

sendForm.onsubmit = e => {
  e.preventDefault();
  if (!messageInput.value.trim()) return;

  push(ref(db, "chats/" + currentChat), {
    text: messageInput.value,
    uid: auth.currentUser.uid,
    author: currentUser.email,
    role: currentUser.role,
    time: Date.now()
  });

  messageInput.value = "";
};

document.querySelectorAll("[data-chat]").forEach(btn => {
  btn.onclick = () => {
    const type = btn.dataset.chat;
    switchChat(type === "role" ? currentUser.role : type);
  };
});

function switchChat(name) {
  messages.innerHTML = "";
  if (chatRef) off(chatRef);

  currentChat = name;
  chatRef = ref(db, "chats/" + currentChat);

  onChildAdded(chatRef, snap => {
    const data = snap.val();
    const div = document.createElement("div");
    div.className = "message " + (data.uid === auth.currentUser.uid ? "me" : "other");

    const header = document.createElement("div");
    header.className = "msg-header";
    header.textContent = `${data.author} • ${data.role}`;

    const text = document.createElement("div");
    text.textContent = data.text;

    div.append(header, text);

    if (data.uid === auth.currentUser.uid) {
      const del = document.createElement("span");
      del.className = "delete-msg";
      del.textContent = "✖";
      del.onclick = () => remove(ref(db, `chats/${currentChat}/${snap.key}`));
      div.appendChild(del);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

logoutBtn.onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};

profileBtn.onclick = () => profileModal.classList.remove("hidden");
closeProfile.onclick = () => profileModal.classList.add("hidden");



