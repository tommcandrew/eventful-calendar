import React from "react";
import weekdays from "../data/weekdays";

const Month = ({ monthIndex, setMonthView, yearView }) => {
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

          <div className="month__cells"></div>
        </div>
      </div>
    </>
  );
};

export default Month;
