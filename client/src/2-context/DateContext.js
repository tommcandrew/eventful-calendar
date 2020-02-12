import React, { useState, createContext, useEffect } from "react";

const DateContext = createContext();

export const DateContextProvider = props => {
  const [dateObj, setDateObj] = useState(null);

  useEffect(() => {
    //set dateObj to current date initially
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

export default DateContext;
