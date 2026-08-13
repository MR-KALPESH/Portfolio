import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6xcrxm9g0HwyvTYRJxLSvsgJFkHLF4g8",
  authDomain: "portfolio-6364d.firebaseapp.com",
  projectId: "portfolio-6364d",
  storageBucket: "portfolio-6364d.firebasestorage.app",
  messagingSenderId: "344174260294",
  appId: "1:344174260294:web:fdf463052835d2536ada47",
  measurementId: "G-0GD6TPHB4Q"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
