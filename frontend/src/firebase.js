import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyCS6uJsCjLkMSHOsIpMKrcbhsyZa5ecaro",
  authDomain: "shared-wishlist-app-3d218.firebaseapp.com",
  projectId: "shared-wishlist-app-3d218",
  storageBucket: "shared-wishlist-app-3d218.appspot.com",
  messagingSenderId: "789869867914",
  appId: "1:789869867914:web:e1911558aff80d19804e73",
  measurementId: "G-422NLTV1C8"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ This fixes your 'db not found' error
export default app;
