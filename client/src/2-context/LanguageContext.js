import React, { useState, createContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageContextProvider = props => {
  const [language, setLanguage] = useState(getInitialLanguage);

  function getInitialLanguage() {
    const savedLanguage = JSON.parse(localStorage.getItem("language"));
    if (savedLanguage !== null) {
      return savedLanguage;
    } else {
      return "English";
    }
  }

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
