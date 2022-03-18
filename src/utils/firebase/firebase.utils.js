import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import {
    getAuth,
    //signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDu3IWDD5y-tcvklSVhLvBBOnRi6swm9Aw",
    authDomain: "crwn-clothing-80423.firebaseapp.com",
    projectId: "crwn-clothing-80423",
    storageBucket: "crwn-clothing-80423.appspot.com",
    messagingSenderId: "534447584901",
    appId: "1:534447584901:web:c0376408f853cb64d41bec"
  };

  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect =() => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(
      userAuth,
      additionalInformation ={}
      ) =>{

        if(!userAuth) return;

      const userDocRef =doc(db, 'user', userAuth.uid);
      //console.log(userDocRef);

      const userSnpashot = await getDoc(userDocRef);
      //console.log(userSnpashot);

      if(!userSnpashot.exists()){
          const {displayName, email} =userAuth;
          const createdAt = new Date();

          try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
          }
          catch (error){
              console.log("there was an error creating the user in the database", error.message)

          }
      }
      return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };