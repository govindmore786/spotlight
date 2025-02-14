// AppContext.js
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [imagesHidden, setImagesHidden] = useState(false);

  return (
    <AppContext.Provider value={{ imagesHidden, setImagesHidden }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
