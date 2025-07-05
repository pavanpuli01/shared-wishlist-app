🛍️  SHARED WISHLIST APP – FlockShop.ai Full Stack Intern Assignment
==================================================================

A collaborative wishlist application where users can create, manage, and 
interact with product wishlists in real time — built for FlockShop.ai.

------------------------------------------------------------------

✅ FEATURES IMPLEMENTED
-----------------------
✔️ Firebase Authentication (Sign Up & Login)
✔️ Shared wishlist for all users
✔️ Add, edit, and remove products (Name, Image, Price)
✔️ Tracks who added each item (user email)
✔️ Timestamps for creation & updates
✔️ Real-time sync using Firebase Realtime DB
✔️ Emoji reactions (👍 / 👎)
✔️ Mock "Invite Others" input field
✔️ Fully responsive mobile UI
✔️ Gold-on-black themed UI
✔️ Wishlist count displayed in navbar

------------------------------------------------------------------

💻 TECH STACK USED
------------------
| Layer            | Technology              |
|------------------|--------------------------|
| Frontend         | React + CSS              |
| Authentication   | Firebase Auth            |
| Database         | Firebase Firestore       |
| Realtime Sync    | Firebase Realtime DB     |
| Hosting (local)  | Firebase / Vercel Ready  |

------------------------------------------------------------------

📁 PROJECT STRUCTURE
--------------------
shared-wishlist-app/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── firebase.js
│   │   ├── ProductGrid.js
│   │   ├── WishlistPage.js
│   │   ├── wishlistService.js
│   │   └── App.css
│   └── public/
├── backend/               (optional placeholder)
├── README.md
└── package.json

------------------------------------------------------------------

⚙️ SETUP INSTRUCTIONS – ONE TERMINAL
------------------------------------

1️⃣ Clone the repository
------------------------
$ git clone https://github.com/yourusername/shared-wishlist-app.git
$ cd shared-wishlist-app

2️⃣ Install frontend dependencies
---------------------------------
$ cd frontend
$ npm install

3️⃣ Configure Firebase
-----------------------
🧩 Steps:
- Go to https://console.firebase.google.com/
- Create new project
- Enable Email/Password Authentication
- Enable Firestore (test mode)
- Copy your Firebase config and paste into:

> frontend/src/firebase.js

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

4️⃣ Start the App
- npm run dev
# Or use
-npm start 
🌐 Open in browser:
http://localhost:3000

💡 ASSUMPTIONS & LIMITATIONS
• Shared wishlist only (no personal lists yet)
• Products can be added/removed, not edited
• Reactions are global counters (not per-user)
• Invite field is mocked (no email logic)
• Firebase handles persistence — no custom backend yet

🧠 FUTURE IMPROVEMENTS
• Support multiple wishlists per user/group
• Role-based access (Owner, Collaborator, Viewer)
• Comment threads below wishlist items
• Product search and filtering
• Activity/audit logs for changes
• Email invites using Firebase Functions / Mailgun
• Optional Express backend for custom logic
• SEO optimization with Next.js

📸 SCREENSHOTS OF UI
LOGIN OR SIGNUP PAGE
![image](https://github.com/user-attachments/assets/f60ccb9b-30ac-49bd-9ecc-1ae9b026c299)
PRODUCTS PAGE
![image](https://github.com/user-attachments/assets/f18656cc-5e39-4e81-99d2-f906117cf87f)
WISHLIST PAGE
![image](https://github.com/user-attachments/assets/c01f9530-bbaf-4e48-82ba-68b97ca63dfa)
