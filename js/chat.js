import { db, auth } from "../firebase/config.js";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const usersList = document.getElementById("usersList");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");
const btn = document.getElementById("sendBtn");

let currentUser = null;

// 🔐 récupérer utilisateur connecté
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    addUser(user);
    loadUsers();
    loadMessages();
  }
});

// 👥 ajouter user dans firestore
async function addUser(user) {
  await addDoc(collection(db, "users"), {
    name: user.displayName,
    photo: user.photoURL
  });
}

// 👥 afficher utilisateurs
function loadUsers() {

  onSnapshot(collection(db, "users"), (snap) => {

    usersList.innerHTML = "";

    snap.forEach((doc) => {
      const u = doc.data();

      usersList.innerHTML += `
        <div class="contact">
          <img src="${u.photo}">
          <span>${u.name}</span>
        </div>
      `;
    });

  });

}

// 💬 envoyer message
btn.onclick = async () => {

  const text = input.value;

  if (!text) return;

  await addDoc(collection(db, "messages"), {
    text,
    user: currentUser.displayName,
    photo: currentUser.photoURL,
    createdAt: Date.now()
  });

  input.value = "";
};

// 💬 afficher messages temps réel
function loadMessages() {

  const q = query(collection(db, "messages"), orderBy("createdAt"));

  onSnapshot(q, (snap) => {

    messagesDiv.innerHTML = "";

    snap.forEach((doc) => {

      const msg = doc.data();

      const isMe = msg.user === currentUser.displayName;

      messagesDiv.innerHTML += `
        <div class="msg ${isMe ? "me" : "other"}">
          <div class="bubble">
            <b>${msg.user}</b><br>
            ${msg.text}
          </div>
        </div>
      `;
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  });

}
