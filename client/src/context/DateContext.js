import React, { useState, createContext, useEffect } from "react";

export const DateContext = createContext();

const DateContextProvider = props => {
  const [dateObj, setDateObj] = useState(null);

  useEffect(() => {
    const newDateObj = {};
    newDateObj.date = new Date().getDate();
    newDateObj.month = new Date().getMonth();
    newDateObj.year = new Date().getFullYear();
    setDateObj(newDateObj);
  }, []);

  return (
    <DateContext.Provider value={{ dateObj, setDateObj }}>
      {props.children}
    </DateContext.Provider>
  );
};

export default DateContextProvider;
