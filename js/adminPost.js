import { auth } from "../firebase/config.js";
import { uploadImage } from "../firebase/storageService.js";
import { addPost } from "../firebase/dbService.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("postForm");

onAuthStateChanged(auth, (user) => {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = document.getElementById("text").value;
    const file = document.getElementById("image").files[0];

    const imageURL = await uploadImage(file);

    await addPost({
      text,
      image: imageURL,
      userName: user.displayName,
      userPhoto: user.photoURL
    });

    alert("Post publié 🔥");
    form.reset();
  });

});
