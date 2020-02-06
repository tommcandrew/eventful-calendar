import React, { useEffect, useState, useContext } from "react";
import createYearArray from "../utils/createYearArray";
import View from "./View";
import DateContext from "../context/DateContext";
import ModalContainer from "./ModalContainer";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import EventsContext from "../context/EventsContext";
import HolidaysContext from "../context/HolidaysContext";
import Alert from "./Alert";
import MyAccount from "./MyAccount";

const Calendar = () => {
  const [yearArray, setYearArray] = useState(null);
  const [showWholeYear, setShowWholeYear] = useState(true);
  const [showModalContainer, setShowModalContainer] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const { dateObj, setDateObj } = useContext(DateContext);
  const { moveEvent, alert } = useContext(EventsContext);
  const { showHolidays } = useContext(HolidaysContext);
  const [showMyAccount, setShowMyAccount] = useState(false);

  useEffect(() => {
    if (showHolidays === "Hide") {
      setHolidays([]);
    }
    if (showHolidays === "Show") {
      fetchHolidays();
    }
    //eslint-disable-next-line
  }, [showHolidays]);

  const onDragEnd = result => {
    const { draggableId, destination } = result;
    if (!destination) {
      return;
    }
    moveEvent(draggableId, destination.droppableId);
  };

  const fetchHolidays = () => {
    axios
      .get(
        `https://calendarific.com/api/v2/holidays?&api_key=423d3eeb339e68f8ac6484808dbda88b657f40b8&country=Uk&year=${dateObj.year}`
      )
      .then(res => {
        setHolidays(
          res.data.response.holidays.filter(
            holiday =>
              holiday.type.includes("National holiday") ||
              holiday.type.includes("Common local holiday")
          )
        );
      });
  };

  useEffect(() => {
    if (dateObj) {
      const yearArray = createYearArray(dateObj.year);
      setYearArray(yearArray);

      if (showHolidays === "True") {
        fetchHolidays();
      }
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
      e.target.classList.contains("event-info__close-button")
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

  if (dateObj && yearArray) {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="calendar">
            {alert && <Alert alert={alert} />}
            {showMyAccount && <MyAccount setShowMyAccount={setShowMyAccount} />}
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
              holidays={holidays}
              showMyAccount={showMyAccount}
              setShowMyAccount={setShowMyAccount}
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
    return <div className="loader"></div>;
  }
};

export default Calendar;
