import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('./firebaseKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // ✅ Updated to your project's Realtime DB URL
    databaseURL: "https://shared-wishlist-app-3d218.firebaseio.com"
  });
}

const db = admin.firestore();
export { db };
