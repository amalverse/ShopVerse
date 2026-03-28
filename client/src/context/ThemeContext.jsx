import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Light mode only — dark mode has been removed
  return (
    <ThemeContext.Provider value={{ isDarkMode: false, toggleDarkMode: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
