import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const firebaseConfig = {
  credential: cert({
    projectId: "aigencycursor",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  storageBucket: "aigencycursor.firebasestorage.app"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const storage = getStorage(); 