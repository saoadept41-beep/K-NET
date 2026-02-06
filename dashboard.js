import { auth, db } from "./firebase.js";
import {
  collection, addDoc, query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentChat = "global";

document.querySelectorAll(".sidebar button").forEach(btn=>{
  btn.onclick=()=>loadChat(btn.dataset.chat);
});

function loadChat(name){
  currentChat = name;
  const q = query(
    collection(db,"chats",name,"messages"),
    orderBy("time")
  );
  onSnapshot(q,snap=>{
    messages.innerHTML="";
    snap.forEach(d=>{
      messages.innerHTML += `<div>${d.data().text}</div>`;
    });
  });
}

sendForm.onsubmit = async e=>{
  e.preventDefault();
  await addDoc(collection(db,"chats",currentChat,"messages"),{
    text: text.value,
    time: Date.now()
  });
  text.value="";
};

loadChat("global");




