import React from 'react';
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import { ROUTE_LOGIN } from '../utils/Constant'

export function ProtectedRoute({ children, roles }) {
  const { REACT_APP_USER } = process.env;
  const { currentUser, loading, logout } = useAuth();

  const usersApp = REACT_APP_USER ? REACT_APP_USER.split(":") : "";

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
 
  if (!currentUser) return <Navigate to={ROUTE_LOGIN} />;

  const userApp = authorization.find((u) => u.user === currentUser.email);

  if (!userApp && userApp.role !== "admin" && !roles.includes(userApp.role)) {
    handleLogout();
  }

  

  //if (!users.includes(user.email)) handleLogout();

  return <>{children}</>;
}
