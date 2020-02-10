import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import DateContext from "../context/DateContext";

const HolidaysContext = createContext();

export const HolidaysContextProvider = props => {
  const [country, setCountry] = useState();
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

  function getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      var countryCode;
      var apikey = "eb95dcf585ee4842a2c5879447ca1840";
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;

      var api_url = "https://api.opencagedata.com/geocode/v1/json";

      var request_url =
        api_url +
        "?" +
        "key=" +
        apikey +
        "&q=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&pretty=1" +
        "&no_annotations=1";
      axios.get(request_url).then(res => {
        countryCode = res.data.results[0].components["ISO_3166-1_alpha-2"];
        setCountry(countryCode);
      });
    });
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (dateObj && country && showHolidays === "Show") {
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
  }, [showHolidays, country]);

  useEffect(() => {
    if (showHolidays && savedHolidays && savedHolidays.length > 0) {
      setHolidays([...savedHolidays]);
    }
  }, [savedHolidays]);

  const fetchHolidays = () => {
    console.log("calling holidays api");
    axios
      .get(
        `https://calendarific.com/api/v2/holidays?&api_key=423d3eeb339e68f8ac6484808dbda88b657f40b8&country=${country}&year=${dateObj.year}`
      )
      .then(res => {
        console.log(res);
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
