import React from "react";

const HolidayList = ({ holidaysOnThisDay }) => {
  return (
    <div className="cell__holiday-names">
      {holidaysOnThisDay.map((holiday, index) => (
        <div key={index + "holiday-title"} className="cell__holiday-name">
          {holiday}
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
