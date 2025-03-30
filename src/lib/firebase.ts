// Firebase yapılandırması ve servisleri
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC35ilTjreZ0S--4hzljfmy3CSKKBCuXCo",
    authDomain: "readnsocial.firebaseapp.com",
    projectId: "readnsocial",
    storageBucket: "readnsocial.firebasestorage.app",
    messagingSenderId: "1036030289884",
    appId: "1:1036030289884:web:e6a88374781fa866129119",
    measurementId: "G-RZ36VMME2S"
};


// Firebase'i başlat (eğer henüz başlatılmamışsa)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Kullanılacak servisler
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
