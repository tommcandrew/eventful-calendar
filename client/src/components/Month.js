import React, { useContext } from "react";
import weekdays from "../data/weekdays";
import Day from "./Day";
import MonthHeader from "./MonthHeader";
import { DateContext } from "../context/DateContext";

const Month = ({
  monthArray,
  monthIndex,
  yearView,
  setMonthView,
  setShowWholeYear,
  setMonth,
  handleShowModalContainer,
  holidays
}) => {
  const { dateObj } = useContext(DateContext);

  return (
    <>
      <div
        className={`month ${
          yearView ? "month--year-view" : "month--month-view"
        }`}
      >
        {/* {!yearView && (
          <button
            className="month__back-button"
            onClick={() => setShowWholeYear(true)}
          >
            &#8678;
          </button>
        )} */}

        <div
          className={`month__content ${
            yearView
              ? "month__content--year-view"
              : "month__content--month-view"
          }`}
          onClick={setMonthView ? () => setMonthView(monthIndex) : null}
        >
          <MonthHeader
            monthIndex={monthIndex}
            yearView={yearView}
            setMonth={setMonth}
            setShowWholeYear={setShowWholeYear}
          />
          <div className="month__weekdays">
            {yearView &&
              weekdays.short.map((weekday, index) => (
                <button
                  className="month__weekdays__weekday"
                  key={index + "weekday"}
                >
                  {weekday}
                </button>
              ))}
            {!yearView &&
              weekdays.long.map((weekday, index) => (
                <button
                  className="month__weekdays__weekday"
                  key={index + "weekday"}
                >
                  {weekday}
                </button>
              ))}
          </div>
          <div className="month__cells">
            {monthArray &&
              monthArray.map((day, index) => {
                return (
                  <Day
                    monthIndex={dateObj.date}
                    day={day}
                    yearView={yearView}
                    handleShowModalContainer={handleShowModalContainer}
                    index={index}
                    holidays={holidays}
                    key={index + "day"}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Month;
