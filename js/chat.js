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

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");
const btn = document.getElementById("sendBtn");

let currentUser = null;

// 🔐 récupérer utilisateur connecté
onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("Connecte-toi d'abord !");
    window.location.href = "login.html";
    return;
  }

  currentUser = user;
  loadMessages();

});

// 💬 envoyer message
btn.addEventListener("click", async () => {

  const text = input.value.trim();

  if (text === "") {
    alert("Message vide !");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      text: text,
      user: currentUser.displayName,
      createdAt: Date.now()
    });

    input.value = "";

  } catch (error) {
    console.error("Erreur envoi:", error);
    alert("Erreur envoi message !");
  }

});

// 💬 afficher messages
function loadMessages() {

  const q = query(collection(db, "messages"), orderBy("createdAt"));

  onSnapshot(q, (snapshot) => {

    messagesDiv.innerHTML = "";

    snapshot.forEach((doc) => {

      const msg = doc.data();
      const isMe = msg.user === currentUser.displayName;

      const div = document.createElement("div");
      div.className = "msg " + (isMe ? "me" : "other");

      div.innerHTML = `
        <div class="bubble">
          <b>${msg.user}</b><br>
          ${msg.text}
        </div>
      `;

      messagesDiv.appendChild(div);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  });

}
