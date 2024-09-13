import React from "react";
import { Routes, Route } from "react-router-dom";
import { Shippings } from "./components/executive/Shippings";
import { Client } from "./components/executive/Client";
import { Home } from "./components/system/Home";
import { Login } from "./components/system/Login";
import { ProtectedRoute } from "./components/system/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import { Products } from "./components/executive/Products";
import { ShipmentProvider } from "./context/shipmentContext";
import { Addresses } from "./components/executive/Addresses";
import Signup from "./components/system/Signup";
import {
  ROUTE_HOME,
  ROUTE_SHIPPINGS,
  ROUTE_PRODUCTS,
  ROUTE_CUSTOMERS,
  ROUTE_ADDRESSES,
  ROUTE_LOGIN,
  ROUTE_FORGOT_PASSWORD,
} from "./components/utils/Constant";
import ForgotPassword from "./components/system/ForgotPassword";

function App() {
  return (
    <div className="h-screen">
      <AuthProvider>
        <ShipmentProvider>
          <Routes>
            <Route path={ROUTE_LOGIN} element={<Login />} />
            <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route
              index
              path={ROUTE_HOME}
              element={
                <ProtectedRoute roles={["admin", "executive", "delivery"]}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_SHIPPINGS}
              element={
                <ProtectedRoute roles={["admin", "executive", "delivery"]}>
                  <Shippings />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_PRODUCTS}
              element={
                <ProtectedRoute roles={["admin", "executive"]}>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_CUSTOMERS}
              element={
                <ProtectedRoute roles={["admin", "executive"]}>
                  <Client />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_ADDRESSES}
              element={
                <ProtectedRoute roles={["admin", "executive"]}>
                  <Addresses />
                </ProtectedRoute>
              }
            />

            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ShipmentProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
