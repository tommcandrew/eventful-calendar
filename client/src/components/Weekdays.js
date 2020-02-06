import React, { useContext } from "react";
import weekdays from "../data/weekdays";
import LanguageContext from "../context/LanguageContext";
import DeviceContext from "../context/DeviceContext";

const Weekdays = ({ yearView }) => {
  const { language } = useContext(LanguageContext);
  const weekdaysObj = weekdays[language];
  const { device } = useContext(DeviceContext);

  const weekdaysArray =
    yearView || device !== "desktop" ? weekdaysObj.short : weekdaysObj.long;

  return (
    <div className="weekdays">
      {weekdaysArray.map((weekday, index) => (
        <button className="weekdays__weekday" key={index + "weekday"}>
          {weekday}
        </button>
      ))}
    </div>
  );
};

export default Weekdays;
