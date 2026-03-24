import { db, auth } from "../firebase/config.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onSnapshot(doc(db, "settings", "site"), (snap) => {

  if (!snap.exists()) return;

  if (snap.data().paused && auth.currentUser?.email !== "octaviowinawina4@gmail.com") {

    document.body.innerHTML = `
      <div class="pause-container">
        <div class="spinner"></div>
        <h1>⛔ SITE EN PAUSE</h1>
        <p>
        salut cher membre de la communauté,<br>
        les administrateurs vous informent que le site est en amélioration.<br>
        revenez dans 1h
        </p>
        <div class="dots"><span></span><span></span><span></span></div>
      </div>
    `;
  }

});
