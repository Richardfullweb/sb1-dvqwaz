import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUi-z6K0puJsqwXZ0qk78W3VJulbn2R3I",
  authDomain: "eventocatolico-9e3db.firebaseapp.com",
  projectId: "eventocatolico-9e3db",
  storageBucket: "eventocatolico-9e3db.firebasestorage.app",
  messagingSenderId: "339106201345",
  appId: "1:339106201345:web:240235af2df8541c92e500"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure persistence
auth.setPersistence('local');

export default app;