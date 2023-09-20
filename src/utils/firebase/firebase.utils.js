import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAujWUrleDNHapdUxs2wU6M5-ngGKLdMcE",
    authDomain: "crwn-clothing-project-f1c10.firebaseapp.com",
    projectId: "crwn-clothing-project-f1c10",
    storageBucket: "crwn-clothing-project-f1c10.appspot.com",
    messagingSenderId: "887153397434",
    appId: "1:887153397434:web:4b007d7e570b206217bc83"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.getCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      }
      catch(error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  };


