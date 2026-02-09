import { db } from "./firebase.js";
import {
  collection, addDoc, query, where, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let channel = "general";
const msgs = document.getElementById("messages");

document.querySelectorAll(".channel").forEach(c => {
  c.onclick = () => {
    document.querySelectorAll(".channel").forEach(x => x.classList.remove("active"));
    c.classList.add("active");
    channel = c.dataset.channel;
    load();
  };
});

async function load() {
  msgs.innerHTML = "";
  const q = query(collection(db,"messages"), where("channel","==",channel));
  onSnapshot(q, snap => {
    msgs.innerHTML = "";
    snap.forEach(d => {
      const m = document.createElement("div");
      m.className = "message";
      m.innerText = d.data().text;
      msgs.appendChild(m);
    });
  });
}

send.onclick = async () => {
  if (!msg.value) return;
  await addDoc(collection(db,"messages"), {
    text: msg.value,
    channel
  });
  msg.value = "";
};

load();

