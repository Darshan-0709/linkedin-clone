
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdRhN0t-PYOz8Dz5cAUi-zatUnbppTPRk",
  authDomain: "linkedin-clone-1b321.firebaseapp.com",
  projectId: "linkedin-clone-1b321",
  storageBucket: "linkedin-clone-1b321.appspot.com",
  messagingSenderId: "92548893002",
  appId: "1:92548893002:web:ea522ed643bc80399399b3"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

setPersistence(auth, browserLocalPersistence);

export { auth, db }