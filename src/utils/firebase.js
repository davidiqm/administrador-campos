import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdaPvTA3ZhfeHgfGGkVcttdO6zbg_0axM",
  authDomain: "administrador-campos.firebaseapp.com",
  projectId: "administrador-campos",
  storageBucket: "administrador-campos.appspot.com",
  messagingSenderId: "886835739438",
  appId: "1:886835739438:web:3655b103357d6a0d5058bf"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);