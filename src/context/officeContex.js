import React from "react";
import { createContext, useState } from "react";
import { useContext } from "react";
import { getOfficeByUser } from '../repositories/OfficeRepository';


export const officeContext = createContext();

export const useOffice = () => {
  const context = useContext(officeContext);
  if (!context) throw new Error("There is no office provider");

  return context;
};

export function OfficeProvider({ children }) {
  const [office, setOffice] = useState(null);

  const getOffice = (user) => {
    getOfficeByUser(user).then((data) => {     
        setOffice(data[0]);
    });
  }

  const value = {
    office,
    setOffice,
    getOffice
  };

  return (
    <officeContext.Provider value={value}>{children}</officeContext.Provider>
  );
}
