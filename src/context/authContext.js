import React from "react";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no auth provider");

  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_USER } = process.env;

  const usersApp = REACT_APP_USER ? REACT_APP_USER.split(":") : "";

  const users = usersApp.map((ua) => {
    return ua.split(",")[0];
  });

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, googleProvider);
      })
      .catch((error) => {
        console.log(error.code + ':' + error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && users.includes(currentUser.email)) {
        setUser(currentUser);
        setLoading(false);
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <authContext.Provider value={{ user, logout, loading, loginWithGoogle }}>
      {children}
    </authContext.Provider>
  );
}
