import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import

const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "FIREBASE DB NAME ",
  projectId: "shared-wishlist-app",
  storageBucket: "*****",
  messagingSenderId: "****",
  appId: "******",
  measurementId: "*****"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ This fixes your 'db not found' error
export default app;
