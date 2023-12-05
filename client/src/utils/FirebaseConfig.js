import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBf2B4ytP9QXlBp5yJD4KptN9anlYDXgJI",
  authDomain: "whatsapp-clone-6a1ff.firebaseapp.com",
  projectId: "whatsapp-clone-6a1ff",
  storageBucket: "whatsapp-clone-6a1ff.appspot.com",
  messagingSenderId: "774859965411",
  appId: "1:774859965411:web:ea59857a8e227f94d516d6",
  measurementId: "G-MQ138E0V0W"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);