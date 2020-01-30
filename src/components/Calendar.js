import React, { useEffect, useState, useContext } from "react";
import View from "./View";
import createYearArray from "../util/createYearArray";
import { DateContext } from "../context/DateContext";

const Calendar = () => {
  const { dateObj, setDateObj } = useContext(DateContext);
  const [yearArray, setYearArray] = useState([]);
  const [showWholeYear, setShowWholeYear] = useState(true);

  useEffect(() => {
    if (dateObj) {
      const yearArray = createYearArray(dateObj.year);
      setYearArray(yearArray);
    }
  }, [dateObj]);

  //CHANGING VIEW

  const setMonthView = monthIndex => {
    setDateObj({ ...dateObj, month: monthIndex });
    setShowWholeYear(false);
  };

  //CHANGING DATE

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

  return (
    <div className="calendar">
      <View
        setMonth={setMonth}
        setMonthView={setMonthView}
        showWholeYear={showWholeYear}
        yearArray={yearArray}
      />
    </div>
  );
};

export default Calendar;
