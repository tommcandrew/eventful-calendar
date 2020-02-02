import React, { useState, createContext, useEffect } from "react";

const HolidaysContext = createContext();

export const HolidaysContextProvider = props => {
  const [showHolidays, setShowHolidays] = useState(getInitialHolidaysPref);

  function getInitialHolidaysPref() {
    const savedHolidaysPref = JSON.parse(localStorage.getItem("holidays"));
    if (savedHolidaysPref !== null) {
      return savedHolidaysPref;
    } else {
      return "Show";
    }
  }

  useEffect(() => {
    localStorage.setItem("holidays", JSON.stringify(showHolidays));
  }, [showHolidays]);

  return (
    <HolidaysContext.Provider value={{ showHolidays, setShowHolidays }}>
      {props.children}
    </HolidaysContext.Provider>
  );
};

export default HolidaysContext;
