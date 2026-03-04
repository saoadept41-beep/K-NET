import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const logoutBtn = document.getElementById("logoutBtn");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

/* Проверка авторизации */
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

/* Logout */
logoutBtn.onclick = () => {
  signOut(auth);
};

/* Отправка сообщения */
messageForm.onsubmit = async (e) => {
  e.preventDefault();

  if (messageInput.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
    text: messageInput.value,
    user: auth.currentUser.email,
    createdAt: serverTimestamp()
  });

  messageInput.value = "";
};

/* Загрузка сообщений в реальном времени */
const q = query(collection(db, "messages"), orderBy("createdAt"));

onSnapshot(q, snapshot => {
  messagesDiv.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>${data.user}</strong><br>${data.text}`;
    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});


