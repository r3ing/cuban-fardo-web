import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Shippings } from "./components/executive/Shippings";
import { Client } from "./components/executive/Client";
import { About } from "./components/system/About";
import { Home } from "./components/system/Home";
import { Login } from "./components/system/Login";
import { Support } from "./components/system/Support";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import { Shipping } from "./components/executive/Shipping";
import { ClientProvider } from "./context/clientContext";
// import { Addresses } from "./components/executive/Addresses";

function App() {
  return (
    <div className="h-screen">
      <AuthProvider>
        <ClientProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/shippings"
              element={
                <ProtectedRoute roles={["executive", "delivery"]}>
                  <Shippings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={ 
                <ProtectedRoute role={["executive"]}>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute role={["executive"]}>
                  <Client />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
