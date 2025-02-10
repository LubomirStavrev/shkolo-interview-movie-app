import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyCmr_Y5wkBHRZdHqizagBW0B8vB9uTSkZE",
  authDomain: "shkolo-interview-movie-app.firebaseapp.com",
  projectId: "shkolo-interview-movie-app",
  storageBucket: "shkolo-interview-movie-app.firebasestorage.app",
  messagingSenderId: "29004972309",
  appId: "1:29004972309:web:28f963a3af6a6dbe14691c",
}

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export { app, auth }

