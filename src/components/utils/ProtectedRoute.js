import React from 'react';
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, roles }) {
  const { REACT_APP_USER_APP } = process.env;
  const { user, loading, logout } = useAuth();

  const usersApp = REACT_APP_USER_APP ? REACT_APP_USER_APP.split(":") : "";

  const authorization = usersApp.map((ua) => {
    let user = ua.split(",")[0];
    let role = ua.split(",")[1];
    return { user, role };
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>loading...</h1>;
 
  if (!user) return <Navigate to="/" />;

  const currentUser = authorization.find((u) => u.user === user.email);

  if (currentUser.role !== "admin" && !roles.includes(currentUser.role)) {
    handleLogout();
  }

  //if (!users.includes(user.email)) handleLogout();

  return <>{children}</>;
}
