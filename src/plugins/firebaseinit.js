import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB1ez3ko73c_lFS8w9B9tvQPgauip-Gd5Y",
  authDomain: "shop-1584d.firebaseapp.com",
  projectId: "shop-1584d",
  storageBucket: "shop-1584d.appspot.com",
  messagingSenderId: "476209495949",
  appId: "1:476209495949:web:ce7a8aea81b5f396cf07c4",
  measurementId: "G-6466ZJEZ9R"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
