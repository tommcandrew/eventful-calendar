import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import DateContext from "../context/DateContext";

const HolidaysContext = createContext();

export const HolidaysContextProvider = props => {
  const [showHolidays, setShowHolidays] = useState(getInitialHolidaysPref);
  const [holidays, setHolidays] = useState(null);
  const [savedHolidays, setSavedHolidays] = useState(null);
  const { dateObj } = useContext(DateContext);

  function getInitialHolidaysPref() {
    const savedHolidaysPref = JSON.parse(localStorage.getItem("holidays"));
    if (savedHolidaysPref !== null) {
      return savedHolidaysPref;
    } else {
      return "Show";
    }
  }

  useEffect(() => {
    if (dateObj && showHolidays === "Show") {
      fetchHolidays();
    }

    //eslint-disable-next-line
  }, [dateObj]);

  useEffect(() => {
    localStorage.setItem("holidays", JSON.stringify(showHolidays));

    if (showHolidays === "Show" && dateObj) {
      if (savedHolidays && savedHolidays.length > 0) {
        setHolidays([...savedHolidays]);
      } else {
        fetchHolidays();
      }
    } else {
      if (showHolidays === "Hide") {
        setHolidays([]);
      }
    }
  }, [showHolidays]);

  useEffect(() => {
    if (showHolidays && savedHolidays && savedHolidays.length > 0) {
      setHolidays([...savedHolidays]);
    }
  }, [savedHolidays]);

  const fetchHolidays = () => {
    console.log("making API call");
    axios
      .get(
        `https://calendarific.com/api/v2/holidays?&api_key=423d3eeb339e68f8ac6484808dbda88b657f40b8&country=Uk&year=${dateObj.year}`
      )
      .then(res => {
        setSavedHolidays(
          res.data.response.holidays.filter(
            holiday =>
              holiday.type.includes("National holiday") ||
              holiday.type.includes("Common local holiday")
          )
        );
      });
  };

  return (
    <HolidaysContext.Provider
      value={{ showHolidays, setShowHolidays, holidays }}
    >
      {props.children}
    </HolidaysContext.Provider>
  );
};

export default HolidaysContext;
