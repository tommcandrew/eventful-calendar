import React, { useState, createContext } from "react";

const HolidaysContext = createContext();

export const HolidaysContextProvider = props => {
  const [showHolidays, setShowHolidays] = useState("True");

  return (
    <HolidaysContext.Provider value={{ showHolidays, setShowHolidays }}>
      {props.children}
    </HolidaysContext.Provider>
  );
};

export default HolidaysContext;
