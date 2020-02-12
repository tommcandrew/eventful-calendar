import React, { useEffect, useState, useContext } from "react";
import createYearArray from "../1-utils/createYearArray";
import DateContext from "../2-context/DateContext";
import EventsContext from "../2-context/EventsContext";
import ThemeContext from "../2-context/ThemeContext";
import View from "./View";
import ModalContainer from "./ModalContainer";
import Alert from "./Alert";
import MyAccount from "./MyAccount";

const Calendar = () => {
  const { dateObj, setDateObj } = useContext(DateContext);
  const { alertText } = useContext(EventsContext);
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [showModalContainer, setShowModalContainer] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWholeYear, setShowWholeYear] = useState(true);
  const [yearArray, setYearArray] = useState(null);
  const { theme } = useContext(ThemeContext);

  //generate calendar once dateObj is passed down from DateContext
  useEffect(() => {
    if (dateObj) {
      const yearArray = createYearArray(dateObj.year);
      setYearArray(yearArray);
    }
    //eslint-disable-next-line
  }, [dateObj]);

  const closeModals = e => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("settings__ok-button") ||
      e.target.classList.contains("modal__close-button")
    ) {
      setShowModalContainer(false);
      setShowMyEvents(false);
      setShowSettings(false);
    }
  };

  const setMonthView = monthIndex => {
    setDateObj({ ...dateObj, month: monthIndex });
    setShowWholeYear(false);
  };

  const setMonth = monthIndex => {
    //these checks apply if user is changing month with arrows in MonthHeader
    if (monthIndex === 12) {
      setDateObj({ ...dateObj, year: dateObj.year + 1, month: 0 });
      return;
    }
    if (monthIndex === -1) {
      setDateObj({ ...dateObj, year: dateObj.year - 1, month: 11 });
      return;
    }
    setDateObj({ ...dateObj, month: monthIndex });
  };

  const setYear = year => {
    setDateObj({ ...dateObj, year });
  };

  //when user clicks on day cell
  const handleShowModalContainer = e => {
    const selectedDate = parseInt(
      e.currentTarget.firstChild.firstChild.textContent
    );
    const newDateObj = new Date(dateObj.year, dateObj.month, selectedDate);
    const dayIndex = newDateObj.getDay();
    setDateObj({ ...dateObj, date: selectedDate, dayIndex });
    setShowModalContainer(true);
  };

  //MyEvents and Settings modals are opened outside of ModalContainer (via HeaderLinks) so handlers are here rather than in ModalContainer
  const handleShowMyEvents = () => {
    setShowMyEvents(true);
    setShowModalContainer(true);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
    setShowModalContainer(true);
  };

  //close DateSelect by clicking anywhere outside it
  const handleCalendarClick = e => {
    if (
      e.target.classList.contains("month-header__date-info") ||
      e.target.classList.contains("month-header__month-name") ||
      e.target.classList.contains("month-header__year-name")
    ) {
      return;
    } else {
      setShowDateSelect(false);
    }
  };

  if (dateObj && yearArray) {
    return (
      <>
        <div
          className={`calendar ${
            theme === "Dark" ? "calendar--dark" : "calendar--light"
          }`}
          onClick={handleCalendarClick}
        >
          {alertText && <Alert alertText={alertText} />}
          {showMyAccount && <MyAccount setShowMyAccount={setShowMyAccount} />}
          <View
            handleShowModalContainer={handleShowModalContainer}
            handleShowMyEvents={handleShowMyEvents}
            handleShowSettings={handleShowSettings}
            setMonth={setMonth}
            setMonthView={setMonthView}
            setShowDateSelect={setShowDateSelect}
            setShowMyAccount={setShowMyAccount}
            setShowWholeYear={setShowWholeYear}
            setYear={setYear}
            showDateSelect={showDateSelect}
            showMyAccount={showMyAccount}
            showWholeYear={showWholeYear}
            yearArray={yearArray}
          />
          {showModalContainer && (
            <ModalContainer
              closeModals={closeModals}
              setShowMyEvents={setShowMyEvents}
              showMyEvents={showMyEvents}
              showSettings={showSettings}
            />
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="loader__wrapper">
        <div className="loader"></div>
      </div>
    );
  }
};

export default Calendar;
