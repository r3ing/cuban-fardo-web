import React from 'react';
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import {
  onAuthStateChanged,
  signOut,
  //GoogleAuthProvider,
  //signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail  
} from "firebase/auth";
import { auth } from "../config/firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no auth provider");

  return context;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);
  // const { REACT_APP_USER } = process.env;

  // const usersApp = REACT_APP_USER ? REACT_APP_USER.split(":") : "";

  // const users = usersApp.map((ua) => {
  //   return ua.split(",")[0];
  // }); 

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {    
    setCurrentUser(null);
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    // onAuthStateChanged(auth, currentUser => {
    //     if(currentUser && users.includes(currentUser.email)) {
    //       setUser(currentUser);
    //       setLoading(false);
    //     }
    // });
    // //eslint-disable-next-line
    
    const unsubscribe = onAuthStateChanged(auth, user => {      
       setCurrentUser(user);
       setLoading(false);   
    })
    return unsubscribe;

    // onAuthStateChanged(auth, user => {      
    //    setCurrentUser(user); 
    //    setLoading(false);    
    // });
    //eslint-disable-next-line     
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <authContext.Provider value={ value }>
      {!loading && children}
    </authContext.Provider>
  );
}
