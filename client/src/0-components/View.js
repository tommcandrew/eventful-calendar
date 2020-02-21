import React, { useContext } from "react";
import Month from "./Month";
import YearHeader from "./YearHeader";
import DateContext from "../2-context/DateContext";
import DeviceContext from "../2-context/DeviceContext";

const View = ({
  handleShowModalContainer,
  handleShowMyEvents,
  handleShowSettings,
  setMonth,
  setMonthView,
  setShowDateSelect,
  setShowMyAccount,
  setShowWholeYear,
  setYear,
  showDateSelect,
  showMyAccount,
  showWholeYear,
  yearArray
}) => {
  const { dateObj } = useContext(DateContext);
  const { device } = useContext(DeviceContext);

  if (showWholeYear && device !== "mobile") {
    return (
      <>
        <YearHeader
          handleShowMyEvents={handleShowMyEvents}
          handleShowSettings={handleShowSettings}
          setShowMyAccount={setShowMyAccount}
          setYear={setYear}
          showMyAccount={showMyAccount}
        />

        <div className="year-view">
          {yearArray.map((month, index) => (
            //12 months
            <Month
              handleShowMyEvents={handleShowMyEvents}
              handleShowSettings={handleShowSettings}
              key={index + "month"}
              monthArray={month}
              monthIndex={index}
              setMonthView={setMonthView}
              showMyAccount={showMyAccount}
              setShowMyAccount={setShowMyAccount}
              yearView={true}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      //single month
      <Month
        handleShowModalContainer={handleShowModalContainer}
        handleShowMyEvents={handleShowMyEvents}
        handleShowSettings={handleShowSettings}
        monthArray={yearArray[dateObj.month]}
        monthIndex={dateObj.month}
        setMonth={setMonth}
        setShowDateSelect={setShowDateSelect}
        setShowMyAccount={setShowMyAccount}
        setShowWholeYear={setShowWholeYear}
        setYear={setYear}
        showDateSelect={showDateSelect}
        showMyAccount={showMyAccount}
        yearView={false}
      />
    );
  }
};

export default View;
