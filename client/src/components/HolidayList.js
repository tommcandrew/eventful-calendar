import React from "react";

const HolidayList = ({ holidayNames }) => {
  return (
    <div className="cell__holiday-names">
      {holidayNames.map((holidayName, index) => (
        <div key={index + "holiday-title"} className="cell__holiday-name">
          {holidayName}
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
