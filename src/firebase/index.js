import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  /* Pesquisar como esconder as minhas key para nao ficar visivel no git */
  apiKey: "AIzaSyB1BPYAbsdVIziMVlgV8eIjF4IuLlvafuk",
  authDomain: "todo-react-b3ba6.firebaseapp.com",
  projectId: "todo-react-b3ba6",
  storageBucket: "todo-react-b3ba6.appspot.com",
  messagingSenderId: "591300836279",
  appId: "1:591300836279:web:45a36987ac99a25c518632",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
