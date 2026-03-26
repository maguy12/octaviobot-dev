import { loginWithGoogle, logout } from "../firebase/authService.js";
import { auth } from "../firebase/config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// LOGIN
const btn = document.getElementById("googleLogin");

if (btn) {
  btn.onclick = async () => {
    try {
      await loginWithGoogle();
      window.location.href = "index.html";
    } catch (e) {
      alert("Erreur login");
      console.error(e);
    }
  };
}

// PROTECTION
onAuthStateChanged(auth, (user) => {

  // Si pas connecté → login
  if (!user && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }

});

// LOGOUT GLOBAL
window.logoutUser = async () => {
  await logout();
  window.location.href = "login.html";
};
