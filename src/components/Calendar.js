import React, { useEffect, useState } from "react";
import createYearArray from "../util/createYearArray";

const Calendar = () => {
  const [yearArray, setYearArray] = useState([]);

  useEffect(() => {
    const yearArray = createYearArray();
    setYearArray(yearArray);
  }, []);

  return <div></div>;
};

export default Calendar;
