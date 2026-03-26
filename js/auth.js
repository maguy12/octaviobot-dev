import { auth } from "../firebase/config.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

const btn = document.getElementById("googleLogin");

// =======================
// 🔐 LOGIN
// =======================
if (btn) {
  btn.addEventListener("click", async () => {

    try {
      // 👉 tente popup
      await signInWithPopup(auth, provider);

      window.location.href = "index.html";

    } catch (error) {

      console.error("Erreur popup:", error);

      // 🔁 fallback si popup bloque
      if (
        error.code === "auth/popup-blocked" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        await signInWithRedirect(auth, provider);
      }

      // ❌ domaine non autorisé
      if (error.code === "auth/unauthorized-domain") {
        alert("Ajoute localhost dans Firebase !");
      }
    }

  });
}

// =======================
// 🔁 RETOUR REDIRECTION
// =======================
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    console.error("Erreur redirect:", error);
  });

// =======================
// 🔐 PROTECTION PAGE
// =======================
onAuthStateChanged(auth, (user) => {

  const isLoginPage = window.location.pathname.includes("login.html");

  // ❌ pas connecté
  if (!user && !isLoginPage) {
    window.location.href = "login.html";
  }

  // ✅ déjà connecté
  if (user && isLoginPage) {
    window.location.href = "index.html";
  }

});

// =======================
// 🚪 LOGOUT GLOBAL
// =======================
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
