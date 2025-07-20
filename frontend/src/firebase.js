import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSka3OIl9UHy3Msz32pV4yh2lHsALwgBc",
  authDomain: "keeper-61118.firebaseapp.com",
  projectId: "keeper-61118",
  storageBucket: "keeper-61118.firebasestorage.app",
  messagingSenderId: "488017760739",
  appId: "1:488017760739:web:2e1fe7535008dcf64450d6",
  measurementId: "G-N618FR938X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider to avoid popup issues in development
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
