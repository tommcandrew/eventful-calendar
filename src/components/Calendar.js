import React, { useEffect, useState, useContext } from "react";
import createYearArray from "../util/createYearArray";
import View from "./View";
import { DateContext } from "../context/DateContext";
import axios from "axios";

const Calendar = () => {
  const [yearArray, setYearArray] = useState(null);
  const [showWholeYear, setShowWholeYear] = useState(true);
  const [holidays, setHolidays] = useState([]);

  const { dateObj, setDateObj } = useContext(DateContext);

  useEffect(() => {
    if (dateObj) {
      const yearArray = createYearArray(dateObj.year);
      setYearArray(yearArray);

      axios
        .get(
          `https://calendarific.com/api/v2/holidays?&api_key=bb4313c99b956fe470dc7c996850b622abbae5fc&country=Uk&year=${dateObj.year}`
        )
        .then(res => {
          setHolidays(
            res.data.response.holidays.filter(
              holiday =>
                holiday.type.includes("National holiday") ||
                holiday.type.includes("Common local holiday")
            )
          );
        });
    }
  }, [dateObj]);

  const setMonthView = monthIndex => {
    setDateObj({ ...dateObj, month: monthIndex });
    setShowWholeYear(false);
  };

  const setYear = year => {
    setDateObj({ ...dateObj, year });
  };

  const setMonth = monthIndex => {
    if (monthIndex === 12) {
      setDateObj({ ...dateObj, year: dateObj.year + 1, month: 0 });
      return;
    }
    if (monthIndex === -1) {
      setDateObj({ ...dateObj, year: dateObj.year - 1, month: 11 });
      return;
    }
    setDateObj({ ...dateObj, month: monthIndex });
  };

  if (dateObj && yearArray) {
    return (
      <>
        <div className="calendar">
          <View
            yearArray={yearArray}
            setMonthView={setMonthView}
            setYear={setYear}
            showWholeYear={showWholeYear}
            setShowWholeYear={setShowWholeYear}
            setMonth={setMonth}
            holidays={holidays}
          />
        </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Calendar;
