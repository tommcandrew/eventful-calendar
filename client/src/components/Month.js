import React, { useContext } from "react";
import Day from "./Day";
import MonthHeader from "./MonthHeader";
import DateContext from "../context/DateContext";
import ThemeContext from "../context/ThemeContext";
import Weekdays from "./Weekdays";

const Month = ({
  monthArray,
  monthIndex,
  yearView,
  setMonthView,
  setShowWholeYear,
  setMonth,
  handleShowModalContainer,
  handleShowSettings,
  handleShowMyEvents,
  showMyAccount,
  setShowMyAccount,
  setShowDateSelect,
  showDateSelect,
  handleSelectYear,
  handleSelectMonth
}) => {
  const { dateObj } = useContext(DateContext);
  const { theme } = useContext(ThemeContext);

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
            handleShowMyEvents={handleShowMyEvents}
            showMyAccount={showMyAccount}
            setShowMyAccount={setShowMyAccount}
            setShowDateSelect={setShowDateSelect}
            showDateSelect={showDateSelect}
            handleSelectYear={handleSelectYear}
            handleSelectMonth={handleSelectMonth}
          />
          <Weekdays yearView={yearView} />
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
