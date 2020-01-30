import React, { useContext } from "react";
import { DateContext } from "../context/DateContext";
import Month from "./Month";

const View = ({ setMonth, setMonthView, showWholeYear, yearArray }) => {
  const { dateObj } = useContext(DateContext);

  if (showWholeYear) {
    return (
      <>
        <div className="year-view">
          {yearArray.map((mappedMonth, index) => (
            <Month
              key={index + "month"}
              monthIndex={index}
              monthArray={mappedMonth}
              setMonthView={setMonthView}
              yearView={true}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <Month
        monthArray={yearArray[dateObj.month]}
        monthIndex={dateObj.month}
        setMonth={setMonth}
        yearView={false}
      />
    );
  }
};

export default View;
