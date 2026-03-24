import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 3000);
};

onAuthStateChanged(auth, (user) => {
  if (!user) return location.href = "login.html";

  userName.innerText = user.displayName;
  userPhoto.src = user.photoURL;
});
