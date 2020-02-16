import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import DateContext from "../2-context/DateContext";
import AuthContext from "../2-context/AuthContext";

const HolidaysContext = createContext();

export const HolidaysContextProvider = props => {
  const [countryObj, setCountryObj] = useState();
  const [showHolidays, setShowHolidays] = useState();
  const [holidays, setHolidays] = useState(null);
  const [storedHolidays, setStoredHolidays] = useState(null);
  const [holidaysYear, setHolidaysYear] = useState(null);
  const [supportedCountries, setSupportedCountries] = useState([]);
  const { dateObj } = useContext(DateContext);
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      getSupportedCountries();
      getInitialHolidaysPref();
    }
    //eslint-disable-next-line
  }, [authenticated]);

  //1. Check LS if already saved there and, if so, save to state, else make API call to get list and save to state
  const getSupportedCountries = () => {
    const savedSupportedCountries = JSON.parse(
      localStorage.getItem("supportedCountries")
    );
    if (savedSupportedCountries) {
      setSupportedCountries(savedSupportedCountries);
    } else {
      axios
        .get("/api/supportedCountries", { timeout: 5000 })
        .then(res => {
          setSupportedCountries(res.data);
          localStorage.setItem("supportedCountries", JSON.stringify(res.data));
        })
        .catch(err => {
          console.log("getSupportedCountries:" + err);
        });
    }
  };

  //2. Check LS for saved preference and save to state, else set to default ('Show')
  const getInitialHolidaysPref = () => {
    const savedHolidaysPref = JSON.parse(localStorage.getItem("holidaysPref"));
    if (savedHolidaysPref) {
      setShowHolidays(savedHolidaysPref);
    } else {
      setShowHolidays("Show");
    }
  };

  //3. If holidays preference changes, save new preference to LS. If 'Hide', set holidays to empty array. Else check LS for saved country and save to state
  //If no location in LS, get location from setLocation()
  useEffect(() => {
    if (showHolidays) {
      localStorage.setItem("holidaysPref", JSON.stringify(showHolidays));
      if (showHolidays === "Hide") {
        setHolidays([]);
        return;
      } else {
        const savedLocation = JSON.parse(localStorage.getItem("country"));
        if (!savedLocation) {
          setLocation();
        } else {
          setCountryObj({ name: savedLocation.name, code: savedLocation.code });
        }
      }
    }
  }, [showHolidays]);

  //4. Try to get user's GPS coordinates. If permission given, make API call to get country info from coordinates and set. Else set default (UK)
  const setLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        axios
          .post("/api/countryInfo", { latitude, longitude }, { timeout: 5000 })
          .then(res => {
            setCountryObj({
              name: res.data.countryName,
              code: res.data.countryCode
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      () => {
        setCountryObj({ name: "United Kingdom", code: "GB" });
      },
      { timeout: 5000 }
    );
  };

  //5. When countryObj changes, save to LS. Before making API call, check both state and LS for that country's holidays. If not there, call fetchHolidays().
  useEffect(() => {
    if (countryObj && countryObj.code) {
      localStorage.setItem("country", JSON.stringify(countryObj));
      if (
        storedHolidays &&
        storedHolidays.holidays.length > 0 &&
        storedHolidays.code === countryObj.code
      ) {
        setHolidays(storedHolidays.holidays);
        return;
      }
      const savedHolidays = JSON.parse(localStorage.getItem("holidays"));
      if (savedHolidays && savedHolidays.code === countryObj.code) {
        setHolidays(savedHolidays.holidays);
        setStoredHolidays(savedHolidays);
        return;
      }
      fetchHolidays();
    }

    //eslint-disable-next-line
  }, [countryObj]);

  //6. Make API call for holidays using year and country
  const fetchHolidays = () => {
    if (countryObj && countryObj.code && dateObj.year) {
      axios
        .post(
          "/holidays",
          { country: countryObj.code, year: dateObj.year },
          { timeout: 5000 }
        )
        .then(res => {
          //this variable used to populate calendar
          setHolidays(res.data);
          //another copy saved in this variable in case user toggles holidays (no need to call API again)
          setStoredHolidays({ code: countryObj.code, holidays: res.data });
          setHolidaysYear(dateObj.year);
          localStorage.setItem(
            "holidays",
            JSON.stringify({ code: countryObj.code, holidays: res.data })
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    //7. if user changes date while using calendar, fetch holidays from API if they changed the year
    if (
      dateObj &&
      countryObj &&
      holidaysYear &&
      dateObj.year !== holidaysYear
    ) {
      fetchHolidays();
    }
    //eslint-disable-next-line
  }, [dateObj]);

  return (
    <HolidaysContext.Provider
      value={{
        showHolidays,
        setShowHolidays,
        holidays,
        countryObj,
        setCountryObj,
        supportedCountries
      }}
    >
      {props.children}
    </HolidaysContext.Provider>
  );
};

export default HolidaysContext;
