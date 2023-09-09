// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNjj8hloEVBPnIUs1HJb545titJm6ujsA",
  authDomain: "health-ab371.firebaseapp.com",
  projectId: "health-ab371",
  storageBucket: "health-ab371.appspot.com",
  messagingSenderId: "68411074983",
  appId: "1:68411074983:web:c04b19a6f1e7b21101ae82",
  measurementId: "G-2L42307HSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const signer = async (phoneNumber) => {
  auth.settings.appVerificationDisabledForTesting = true;
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in", {
    size: "invisible",
  });
  const appVerifier = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("sms sent");
      window.confirmationResult = confirmationResult;
      window.recaptchaVerifier.clear();
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const checker = async (code) => {
  return confirmationResult
    .confirm(code)
    .then((result) => {
      console.log("signind");
      const user = result.user;
      // console.log(user);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const unSigner = async () => {
  await signOut(auth)
    .then(() => console.log("signed out"))
    .catch((eror) => {
      console.log(eror);
    });
};
