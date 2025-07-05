// src/wishlistService.js
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

const SHARED_ID = 'shared-group';

// 🔄 Fetch wishlist (one-time)
export async function getWishlist() {
  const itemsRef = collection(db, `wishlists/${SHARED_ID}/items`);
  const snapshot = await getDocs(itemsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 💾 Save all items with timestamps
export async function saveWishlist(items) {
  const refPath = `wishlists/${SHARED_ID}/items`;

  const existing = await getWishlist();
  for (let item of existing) {
    await deleteDoc(doc(db, refPath, item.id));
  }

  for (let item of items) {
    const cleanId = item.id || item.name;
    await setDoc(doc(db, refPath, cleanId), {
      ...item,
      updatedAt: serverTimestamp(),
      createdAt: item.createdAt || serverTimestamp(),
    });
  }
}

// 🔁 Real-time Firestore sync listener
export function onWishlistChange(callback) {
  const itemsRef = collection(db, `wishlists/${SHARED_ID}/items`);
  const q = query(itemsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(items);
  });
}

// 👍 Increment like
export async function addLike(itemId) {
  const itemRef = doc(db, `wishlists/${SHARED_ID}/items`, itemId);
  await updateDoc(itemRef, {
    likes: increment(1),
    updatedAt: serverTimestamp()
  });
}

// 👎 Increment dislike
export async function addDislike(itemId) {
  const itemRef = doc(db, `wishlists/${SHARED_ID}/items`, itemId);
  await updateDoc(itemRef, {
    dislikes: increment(1),
    updatedAt: serverTimestamp()
  });
}
