// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDwHmuHgNhaQ0rXLqhcaN4dMeN-PYVj5rU",
	authDomain: "phone-auth-58b25.firebaseapp.com",
	projectId: "phone-auth-58b25",
	storageBucket: "phone-auth-58b25.appspot.com",
	messagingSenderId: "392878942628",
	appId: "1:392878942628:web:d11c91af6228549a0df931"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
