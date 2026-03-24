import { db, auth } from "../firebase/config.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  onSnapshot,
  addDoc,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("postsContainer");

// 🔥 CHARGER POSTS
async function loadPosts() {

  const querySnapshot = await getDocs(collection(db, "posts"));

  container.innerHTML = "";

  querySnapshot.forEach((docSnap) => {

    const post = docSnap.data();
    const postId = docSnap.id;

    container.innerHTML += `
      <div class="post">

        <div class="post-header">
          <img src="${post.userPhoto}" />
          <span>${post.userName}</span>
        </div>

        <p>${post.text}</p>

        <img class="post-img" src="${post.image}" />

        <div class="actions">
          <button onclick="likePost('${postId}')">❤️ Like</button>
          <span id="likes-${postId}">0</span>
        </div>

        <div class="comments">
          <input type="text" id="comment-${postId}" placeholder="Commenter...">
          <button onclick="addComment('${postId}')">Envoyer</button>

          <div id="comments-${postId}"></div>
        </div>

      </div>
    `;

    // 🔁 écouter likes
    listenLikes(postId);

    // 🔁 écouter commentaires
    listenComments(postId);

  });

}

loadPosts();


// ❤️ LIKE
window.likePost = async (postId) => {
  const postRef = doc(db, "posts", postId);

  await updateDoc(postRef, {
    likes: increment(1)
  });
};


// 🔁 TEMPS RÉEL LIKE
function listenLikes(postId) {

  const postRef = doc(db, "posts", postId);

  onSnapshot(postRef, (docSnap) => {
    if (docSnap.exists()) {
      document.getElementById("likes-" + postId).innerText =
        docSnap.data().likes || 0;
    }
  });

}


// 💬 AJOUT COMMENTAIRE
window.addComment = async (postId) => {

  const input = document.getElementById("comment-" + postId);
  const text = input.value;

  if (text === "") return;

  await addDoc(collection(db, "posts", postId, "comments"), {
    text: text,
    user: auth.currentUser.displayName
  });

  input.value = "";
};


// 🔁 TEMPS RÉEL COMMENTAIRES
function listenComments(postId) {

  const q = query(collection(db, "posts", postId, "comments"));

  onSnapshot(q, (snapshot) => {

    const container = document.getElementById("comments-" + postId);
    container.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const c = docSnap.data();

      container.innerHTML += `
        <p><b>${c.user}:</b> ${c.text}</p>
      `;
    });

  });

                                         }
