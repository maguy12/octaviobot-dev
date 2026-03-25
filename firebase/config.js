import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIQYQLgaSvU3fJMVwL3WR-HG0ZrdiuTyY",
  authDomain: "octaviobot-dev.firebaseapp.com",
  projectId: "octaviobot-dev",
  storageBucket: "octaviobot-dev.firebasestorage.app",
  messagingSenderId: "461209419857",
  appId: "1:461209419857:web:cce39bc8f496cf0fbdf870"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
