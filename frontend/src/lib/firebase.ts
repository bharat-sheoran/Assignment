import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD2nrGyl0TArV_cKJwvFGZHBLIB2TRN34s",
    authDomain: "assignment-be3f4.firebaseapp.com",
    projectId: "assignment-be3f4",
    storageBucket: "assignment-be3f4.firebasestorage.app",
    messagingSenderId: "141433046284",
    appId: "1:141433046284:web:a68b24ca5bd44f7c09b529",
    measurementId: "G-PZ8HL7C1CP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);