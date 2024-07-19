import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYH66PjstRejnEaRBJbgpXg8hhLbIv1yo",
    authDomain: "jobweb-daa20.firebaseapp.com",
    projectId: "jobweb-daa20",
    storageBucket: "jobweb-daa20.appspot.com",
    messagingSenderId: "1009335645582",
    appId: "1:1009335645582:web:1bed017853ad2d399b20df",
    measurementId: "G-RVHBPXST96"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  

export {auth, db, storage}
