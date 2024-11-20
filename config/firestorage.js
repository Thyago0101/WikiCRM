import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Configurações do Firebase

const firebaseConfig = {
    // Adicione as variáves conforme gerado na tela do projeto Firebase
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let auth;

try {
    auth = getAuth(app); 
} catch (error) {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)  
    });
}

export {app, db, auth}
