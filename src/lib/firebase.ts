import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDp_T6-qr-Es37o5BOufKocfugnyWh_Kag",
  authDomain: "graindispatch2.firebaseapp.com",
  projectId: "graindispatch2",
  storageBucket: "graindispatch2.firebasestorage.app",
  messagingSenderId: "54068618191",
  appId: "1:54068618191:web:b3858c5361581de963a8ba",
  measurementId: "G-BNW9Z2JTV5"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
