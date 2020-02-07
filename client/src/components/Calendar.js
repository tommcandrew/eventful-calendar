import React, { useEffect, useState, useContext } from "react";
import createYearArray from "../utils/createYearArray";
import View from "./View";
import DateContext from "../context/DateContext";
import ModalContainer from "./ModalContainer";
import { DragDropContext } from "react-beautiful-dnd";
import EventsContext from "../context/EventsContext";
import Alert from "./Alert";
import MyAccount from "./MyAccount";
import DateSelect from "./DateSelect";

const Calendar = () => {
  const [yearArray, setYearArray] = useState(null);
  const [showWholeYear, setShowWholeYear] = useState(true);
  const [showModalContainer, setShowModalContainer] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { dateObj, setDateObj } = useContext(DateContext);
  const { moveEvent, alert } = useContext(EventsContext);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showDateSelect, setShowDateSelect] = useState(false);

  const onDragEnd = result => {
    const { draggableId, destination } = result;
    if (!destination) {
      return;
    }
    moveEvent(draggableId, destination.droppableId);
  };

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
      e.target.classList.contains("button--done") ||
      e.target.classList.contains("my-events__close-button") ||
      e.target.classList.contains("day-events__close-button") ||
      e.target.classList.contains("event-form__close-button") ||
      e.target.classList.contains("event-info__close-button") ||
      e.target.classList.contains("settings__close-button")
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

  const setYear = year => {
    setDateObj({ ...dateObj, year });
  };

  const handleSelectYear = e => {
    // setShowDateSelect(false);
    const selectedYear = e.target.innerText;
    setYear(selectedYear);
  };

  const handleSelectMonth = index => {
    // setShowDateSelect(false);
    setMonth(index);
  };

  const setMonth = monthIndex => {
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

  const handleShowModalContainer = e => {
    const selectedDate = parseInt(
      e.currentTarget.firstChild.firstChild.textContent
    );
    setDateObj({ ...dateObj, date: selectedDate });
    setShowModalContainer(true);
  };

  const handleShowMyEvents = () => {
    setShowMyEvents(true);
    setShowModalContainer(true);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
    setShowModalContainer(true);
  };

  const handleCalendarClick = e => {
    if (
      e.target.classList.contains("month-header__date-info") ||
      e.target.classList.contains("month-header__month-name") ||
      e.target.classList.contains("month-header__year-name")
    ) {
      console.log("returning");

      return;
    } else {
      setShowDateSelect(false);
    }
  };

  if (dateObj && yearArray) {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="calendar" onClick={handleCalendarClick}>
            {alert && <Alert alert={alert} />}
            {showMyAccount && <MyAccount setShowMyAccount={setShowMyAccount} />}

            {showDateSelect && (
              <DateSelect
                handleSelectYear={handleSelectYear}
                handleSelectMonth={handleSelectMonth}
              />
            )}
            <View
              yearArray={yearArray}
              setMonthView={setMonthView}
              setYear={setYear}
              showWholeYear={showWholeYear}
              setShowWholeYear={setShowWholeYear}
              setMonth={setMonth}
              handleShowModalContainer={handleShowModalContainer}
              handleShowMyEvents={handleShowMyEvents}
              handleShowSettings={handleShowSettings}
              showMyAccount={showMyAccount}
              setShowMyAccount={setShowMyAccount}
              setShowDateSelect={setShowDateSelect}
              showDateSelect={showDateSelect}
            />
          </div>
          {showModalContainer && (
            <ModalContainer
              closeModals={closeModals}
              showMyEvents={showMyEvents}
              setShowMyEvents={setShowMyEvents}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
            />
          )}
        </DragDropContext>
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
