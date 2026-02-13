import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, push, onChildAdded, get, remove, off } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messages = document.getElementById("messages");
const sendForm = document.getElementById("sendForm");
const messageInput = document.getElementById("messageInput");

const profileBtn = document.getElementById("profileBtn");
const profileModal = document.getElementById("profileModal");
const closeProfile = document.getElementById("closeProfile");

const pName = document.getElementById("pName");
const pRole = document.getElementById("pRole");
const pDate = document.getElementById("pDate");

let currentChat = "global";
let chatRef;
let currentUser = {};

onAuthStateChanged(auth, async user => {
  if (!user) return location.href = "index.html";

  const snap = await get(ref(db, "users/" + user.uid));
  currentUser = snap.val();

  pName.textContent = currentUser.email;
  pRole.textContent = currentUser.role;
  pDate.textContent = new Date(currentUser.createdAt || Date.now()).toLocaleDateString("fr-FR");

  loadChat("global");
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
  btn.onclick = () => loadChat(btn.dataset.chat === "role" ? currentUser.role : btn.dataset.chat);
});

function loadChat(name) {
  messages.innerHTML = "";
  if (chatRef) off(chatRef);

  currentChat = name;
  chatRef = ref(db, "chats/" + currentChat);

  onChildAdded(chatRef, snap => {
    const d = snap.val();
    const div = document.createElement("div");
    div.className = "message " + (d.uid === auth.currentUser.uid ? "me" : "other");

    div.innerHTML = `
      <div class="msg-header">${d.author} • ${d.role}</div>
      <div>${d.text}</div>
    `;

    if (d.uid === auth.currentUser.uid) {
      const del = document.createElement("span");
      del.className = "delete-msg";
      del.textContent = "✖";
      del.onclick = () => {
        div.classList.add("removing");
        setTimeout(() => remove(ref(db, `chats/${currentChat}/${snap.key}`)), 500);
      };
      div.appendChild(del);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

profileBtn.onclick = () => profileModal.classList.remove("hidden");
closeProfile.onclick = () => profileModal.classList.add("hidden");




