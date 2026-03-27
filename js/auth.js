import { auth } from "../firebase/config.js";

import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

// =======================
// 🔐 LOGIN (REDIRECTION)
// =======================
const btn = document.getElementById("googleLogin");

if (btn) {
  btn.onclick = async () => {
    await signInWithRedirect(auth, provider);
  };
}

// =======================
// 🔁 RETOUR LOGIN
// =======================
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      console.log("Connecté !");
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    console.error("Erreur:", error);
  });

// =======================
// 🔐 PROTECTION
// =======================
onAuthStateChanged(auth, (user) => {

  const isLoginPage = window.location.pathname.includes("login.html");

  if (!user && !isLoginPage) {
    window.location.href = "login.html";
  }

  if (user && isLoginPage) {
    window.location.href = "index.html";
  }

});

// =======================
// 🚪 LOGOUT
// =======================
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
