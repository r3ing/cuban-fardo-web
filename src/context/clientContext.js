import { createContext, useState } from "react";
import { useContext } from "react";

export const clientContext = createContext();

export const useClient = () => {
  const context = useContext(clientContext);
  if (!context) throw new Error("There is no client provider");

  return context;
};

export function ClientProvider({ children }) {

  const [customer, setCustomer] = useState(null);

  return (
    <clientContext.Provider value={{ customer, setCustomer }}>
      {children}
    </clientContext.Provider>
  );
}
