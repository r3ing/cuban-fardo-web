import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const {
  REACT_APP_APIKEY_APP,
  REACT_APP_AUTHDOMAIN_APP,
  REACT_APP_PROJECTID_APP,
  REACT_APP_STORAGEBUCKET_APP,
  REACT_APP_MESSAGINGSENDETID_APP,
  REACT_APP_APPID_APP,
  REACT_APP_MEASUREMENTID_APP
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY_APP,
  authDomain: REACT_APP_AUTHDOMAIN_APP,
  projectId: REACT_APP_PROJECTID_APP,
  storageBucket: REACT_APP_STORAGEBUCKET_APP,
  messagingSenderId: REACT_APP_MESSAGINGSENDETID_APP,
  appId: REACT_APP_APPID_APP,
  measurementId: REACT_APP_MEASUREMENTID_APP,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
