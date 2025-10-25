import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMjMFhCSNGCWpzwlo8AItaZN2vJ63teyc",
    authDomain: "product-app-cebb8.firebaseapp.com",
    projectId: "product-app-cebb8",
    storageBucket: "product-app-cebb8.firebasestorage.app",
    messagingSenderId: "584176119035",
    appId: "1:584176119035:web:258ba51e3ff401c327d45e",
    measurementId: "G-1NCEVG8LQ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
