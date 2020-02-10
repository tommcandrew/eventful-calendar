import React, { useContext } from "react";
import Month from "./Month";
import YearHeader from "./YearHeader";
import DateContext from "../context/DateContext";
import DeviceContext from "../context/DeviceContext";

const View = ({
  yearArray,
  setMonthView,
  setYear,
  showWholeYear,
  setShowWholeYear,
  setMonth,
  handleShowModalContainer,
  handleShowMyEvents,
  handleShowSettings,
  showMyAccount,
  setShowMyAccount,
  setShowDateSelect,
  showDateSelect,
  handleSelectYear,
  handleSelectMonth
}) => {
  const { dateObj } = useContext(DateContext);
  const { device } = useContext(DeviceContext);

  if (showWholeYear && device === "desktop") {
    return (
      <>
        <YearHeader
          setYear={setYear}
          handleShowMyEvents={handleShowMyEvents}
          handleShowSettings={handleShowSettings}
          showMyAccount={showMyAccount}
          setShowMyAccount={setShowMyAccount}
        />

        <div className="year-view">
          {yearArray.map((mappedMonth, index) => (
            <Month
              monthArray={mappedMonth}
              yearView={true}
              setMonthView={setMonthView}
              monthIndex={index}
              key={index + "month"}
              handleShowMyEvents={handleShowMyEvents}
              handleShowSettings={handleShowSettings}
              showMyAccount={showMyAccount}
              setShowMyAccount={setShowMyAccount}
              handleSelectYear={handleSelectYear}
              handleSelectMonth={handleSelectMonth}
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
        // holidays={holidays}
        handleShowSettings={handleShowSettings}
        handleShowMyEvents={handleShowMyEvents}
        showMyAccount={showMyAccount}
        setShowMyAccount={setShowMyAccount}
        setShowDateSelect={setShowDateSelect}
        showDateSelect={showDateSelect}
      />
    );
  }
};

export default View;
