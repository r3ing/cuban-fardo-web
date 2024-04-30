import React from "react";
import { Routes, Route } from "react-router-dom";
import { Shippings } from "./components/executive/Shippings";
import { Client } from "./components/executive/Client";
import { Home } from "./components/system/Home";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import { Products } from "./components/executive/Products";
import { ShipmentProvider } from "./context/shipmentContext";
import { Addresses } from "./components/executive/Addresses";
import {
  ROUTE_HOME,
  ROUTE_SHIPPINGS,
  ROUTE_PRODUCTS,
  ROUTE_CUSTOMERS,
  ROUTE_ADDRESSES,
} from "./components/common/Costanst";

function App() {
  return (
    <div className="h-screen">
      <AuthProvider>
        <ShipmentProvider>
          <Routes>
            <Route path={ROUTE_HOME} element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="*" element={<Home />} />
            <Route
              path={ROUTE_SHIPPINGS}
              element={
                <ProtectedRoute roles={["admin","executive","delivery"]}>
                  <Shippings />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_PRODUCTS}
              element={
                <ProtectedRoute roles={["admin","executive"]}>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_CUSTOMERS}
              element={
                <ProtectedRoute roles={["admin","executive"]}>
                  <Client />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_ADDRESSES}
              element={
                <ProtectedRoute roles={["admin","executive"]}>
                  <Addresses />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ShipmentProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
