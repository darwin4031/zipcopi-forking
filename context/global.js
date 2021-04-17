import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <GlobalContext.Provider value={{ showFilter, setShowFilter }}>
      {children}
    </GlobalContext.Provider>
  );
};
