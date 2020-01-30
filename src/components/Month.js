import React, { useContext } from "react";
import { DateContext } from "../context/DateContext";
import weekdays from "../data/weekdays";
import Day from "./Day";

const Month = ({ monthArray, monthIndex, setMonthView, yearView }) => {
  const { dateObj } = useContext(DateContext);

  return (
    <>
      <div
        className={`month ${
          yearView ? "month--year-view" : "month--month-view"
        }`}
      >
        <div
          className={`month__content ${
            yearView
              ? "month__content--year-view"
              : "month__content--month-view"
          }`}
          onClick={setMonthView ? () => setMonthView(monthIndex) : null}
        >
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
                    day={day}
                    monthIndex={dateObj.date}
                    index={index}
                    key={index + "day"}
                    yearView={yearView}
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
