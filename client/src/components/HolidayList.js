import React from "react";

const HolidayList = ({ holidayNames }) => {
  return (
    <div className="cell__holiday-names">
      {holidayNames.map((holiday, index) => (
        <div key={index + "holiday-title"} className="cell__holiday-name">
          {holiday}
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
