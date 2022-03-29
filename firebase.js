import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDSrLyIpuPye3ZtGzmUufgyI-ZCIWwiS4Y",
	authDomain: "courses-3b2db.firebaseapp.com",
	projectId: "courses-3b2db",
	storageBucket: "courses-3b2db.appspot.com",
	messagingSenderId: "716453802456",
	appId: "1:716453802456:web:440acb8c7dd5422d5642ad",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
