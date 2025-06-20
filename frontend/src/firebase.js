import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD1FAokBefncyyEw0kGBFTWfJa3RNL3GsQ",
  authDomain: "video-streaming-app-e26da.firebaseapp.com",
  projectId: "video-streaming-app-e26da",
  storageBucket: "video-streaming-app-e26da.firebasestorage.app",
  messagingSenderId: "143243907176",
  appId: "1:143243907176:web:41b2270077270353466bdd",
  measurementId: "G-L7EJHEESFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt:"select_account"
})