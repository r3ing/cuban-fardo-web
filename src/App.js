import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ShipmentProvider } from "./context/shipmentContext";
import { OfficeProvider } from "./context/officeContex";
import { Shippings } from "./components/executive/Shippings";
import { Client } from "./components/executive/Client";
import { About } from "./components/system/About";
import { Home } from "./components/system/Home";
import { Login } from "./components/system/Login";
import { Support } from "./components/system/Support";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";
import { Products } from "./components/executive/Products";
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
        <OfficeProvider>
          <ShipmentProvider>
            <Routes>
              <Route path={ROUTE_HOME} element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
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
            </Routes>
          </ShipmentProvider>
        </OfficeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
