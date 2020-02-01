import React, { useContext, useEffect } from "react";
import weekdays from "../data/weekdays";
import Day from "./Day";
import MonthHeader from "./MonthHeader";
import DateContext from "../context/DateContext";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";

const Month = ({
  monthArray,
  monthIndex,
  yearView,
  setMonthView,
  setShowWholeYear,
  setMonth,
  handleShowModalContainer,
  holidays,
  handleShowSettings
}) => {
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  const weekdaysArray = weekdays[language];

  return (
    <>
      <div
        className={`month ${
          yearView ? "month--year-view" : "month--month-view"
        }${theme === "Dark" ? " month--dark" : " month--light"}`}
      >
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
            handleShowSettings={handleShowSettings}
          />
          <div className="month__weekdays">
            {yearView &&
              weekdaysArray.short.map((weekday, index) => (
                <button
                  className="month__weekdays__weekday"
                  key={index + "weekday"}
                >
                  {weekday}
                </button>
              ))}
            {!yearView &&
              weekdaysArray.long.map((weekday, index) => (
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
