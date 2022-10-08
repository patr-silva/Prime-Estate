import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAciaSKOrM9CUWGzoF1bufV9WaqfIMwUjg",
  authDomain: "house-marketplace-app-b5428.firebaseapp.com",
  projectId: "house-marketplace-app-b5428",
  storageBucket: "house-marketplace-app-b5428.appspot.com",
  messagingSenderId: "614556153466",
  appId: "1:614556153466:web:805b50cc293fb4555a2dc3",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
