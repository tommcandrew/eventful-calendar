import React, { useContext } from "react";
import Month from "./Month";
import YearHeader from "./YearHeader";
import { DateContext } from "../context/DateContext";

const View = ({
  yearArray,
  setMonthView,
  setYear,
  showWholeYear,
  setShowWholeYear,
  setMonth,
  handleShowModalContainer,
  holidays
}) => {
  const { dateObj } = useContext(DateContext);

  if (showWholeYear) {
    return (
      <>
        <div className="year-view">
          {yearArray.map((mappedMonth, index) => (
            <Month
              monthArray={mappedMonth}
              yearView={true}
              setMonthView={setMonthView}
              monthIndex={index}
              key={index + "month"}
              holidays={holidays}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <Month
        yearView={false}
        setShowWholeYear={setShowWholeYear}
        monthArray={yearArray[dateObj.month]}
        monthIndex={dateObj.month}
        setMonth={setMonth}
        handleShowModalContainer={handleShowModalContainer}
        holidays={holidays}
      />
    );
  }
};

export default View;
