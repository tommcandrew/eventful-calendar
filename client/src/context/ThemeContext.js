import React, { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = props => {
  const [theme, setTheme] = useState("Light");

  function getInitialTheme() {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    if (savedTheme !== null) {
      return savedTheme;
    } else {
      return "Light";
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
