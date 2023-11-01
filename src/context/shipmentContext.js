import React from 'react';
import { createContext, useState } from "react";
import { useContext } from "react";

export const shipmentContext = createContext();

export const useShipment = () => {
  const context = useContext(shipmentContext);
  if (!context) throw new Error("There is no client provider");

  return context;
};

export function ShipmentProvider({ children }) {

  const [customer, setCustomer] = useState(null);
  const [address, setAddress] = useState(null);
  const [articles, setArticles] = useState(null);

  return (
    <shipmentContext.Provider value={{ customer, address, articles, setCustomer, setAddress, setArticles }}>
      {children}
    </shipmentContext.Provider>
  );
}
