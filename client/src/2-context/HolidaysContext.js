import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import DateContext from "../2-context/DateContext";

const HolidaysContext = createContext();

export const HolidaysContextProvider = props => {
  const [country, setCountry] = useState();
  const [showHolidays, setShowHolidays] = useState(getInitialHolidaysPref);
  const [holidays, setHolidays] = useState(null);
  const [savedHolidays, setSavedHolidays] = useState(null);
  const [holidaysYear, setHolidaysYear] = useState(null);
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

  //can't seem to get it to work by passing in getLocation as arg to useState so doing it like this
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (showHolidays === "Show" && dateObj && country) {
      //instead of making another call to API, check if already saved
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
    //eslint-disable-next-line
  }, [showHolidays, country]);

  useEffect(() => {
    //check whether user has changed year (so fetch again) or only changed month (no fetch)
    if (dateObj && holidaysYear && dateObj.year !== holidaysYear) {
      fetchHolidays();
    }
    //eslint-disable-next-line
  }, [dateObj]);

  useEffect(() => {
    //save user's preference when changed
    localStorage.setItem("holidays", JSON.stringify(showHolidays));
  }, [showHolidays]);

  useEffect(() => {
    if (showHolidays && savedHolidays && savedHolidays.length > 0) {
      setHolidays([...savedHolidays]);
    }
    //eslint-disable-next-line
  }, [savedHolidays]);

  const fetchHolidays = () => {
    if (country && dateObj) {
      axios
        .get(
          `https://calendarific.com/api/v2/holidays?&api_key=423d3eeb339e68f8ac6484808dbda88b657f40b8&country=${country}&year=${dateObj.year}`
        )
        .then(res => {
          const allHolidays = res.data.response.holidays;
          const selectHolidays = allHolidays.filter(
            holiday =>
              holiday.type.includes("National holiday") ||
              holiday.type.includes("Common local holiday") ||
              holiday.type.includes("Clock change/Daylight Saving Time") ||
              (holiday.type.includes("Observance") &&
                //not including Scottish holidays because of duplicates (e.g. Easter Monday)
                !holiday.locations.includes("SCT"))
          );
          setSavedHolidays(selectHolidays);
          setHolidaysYear(dateObj.year);
        });
    }
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
