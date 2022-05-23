import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi5y2mTVbU9n_7qXqvnpitlZrIqg7RJgo",
  authDomain: "engage-project-8db01.firebaseapp.com",
  projectId: "engage-project-8db01",
  storageBucket: "engage-project-8db01.appspot.com",
  messagingSenderId: "249074516915",
  appId: "1:249074516915:web:ad8fe5c49578f98c5401c6",
  measurementId: "G-FP2M3GJSB4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
