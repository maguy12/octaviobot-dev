import { auth } from "../firebase/config.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

// 🔐 LOGIN
const btn = document.getElementById("googleLogin");

if (btn) {
  btn.addEventListener("click", async () => {

    try {
      await signInWithPopup(auth, provider);

      // redirection après login
      window.location.href = "index.html";

    } catch (error) {
      console.error("Erreur login:", error);
      alert("Erreur connexion !");
    }

  });
}

// 🔁 REDIRECTION AUTO
onAuthStateChanged(auth, (user) => {

  if (user && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }

});

// 🚪 LOGOUT GLOBAL
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
