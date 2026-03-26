import { auth } from "../firebase/config.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ⏳ LOADER (3 secondes obligatoire)
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 3000);
});

// 🔐 AUTH + USER UI
onAuthStateChanged(auth, (user) => {

  // ❌ pas connecté → login
  if (!user) {
    if (!window.location.pathname.includes("login.html")) {
      window.location.href = "login.html";
    }
    return;
  }

  // ✅ connecté → afficher info
  const name = document.getElementById("userName");
  const photo = document.getElementById("userPhoto");

  if (name) name.innerText = user.displayName;
  if (photo) photo.src = user.photoURL;

});
