import React, { useContext } from "react";
import LanguageContext from "../2-context/LanguageContext";
import DeviceContext from "../2-context/DeviceContext";
import weekdays from "../3-data/weekdays";

const Weekdays = ({ yearView }) => {
  const { language } = useContext(LanguageContext);
  const { device } = useContext(DeviceContext);
  const weekdaysObj = weekdays[language];

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
