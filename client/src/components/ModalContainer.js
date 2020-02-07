import React, { useState, useContext } from "react";
import ModalHeader from "./ModalHeader";
import DayEvents from "./DayEvents";
import EventForm from "./EventForm";
import EventInfo from "./EventInfo";
import EventsContext from "../context/EventsContext";
import DateContext from "../context/DateContext";
import ThemeContext from "../context/ThemeContext";
import MyEvents from "./MyEvents";
import uuid from "uuid";
import Settings from "./Settings";
import getDayEvents from "../utils/getDayEvents";
import HolidaysContext from "../context/HolidaysContext";
import getDayHolidays from "../utils/getDayHolidays";

const ModalContainer = ({
  closeModals,
  showMyEvents,
  setShowMyEvents,
  showSettings
  // holidays
}) => {
  const [showDayEvents, setShowDayEvents] = useState(!showMyEvents && true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viaMyEvents, setViaMyEvents] = useState(null);
  //putting these here because I want modal content onClick (in this component) to hide icons/time list in EventForm
  const [showIcons, setShowIcons] = useState(false);
  const [showTimeList, setShowTimeList] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { events, addEvent, editEvent, deleteEvent } = useContext(
    EventsContext
  );
  const { dateObj } = useContext(DateContext);
  const { theme } = useContext(ThemeContext);
  const { holidays } = useContext(HolidaysContext);

  const eventsOnThisDay = getDayEvents(events, dateObj);
  const holidaysOnThisDay = getDayHolidays(holidays, dateObj);

  const handleGoBack = () => {
    setShowEventInfo(false);
    setShowEventForm(false);
    if (viaMyEvents) {
      setShowMyEvents(true);
    } else {
      setShowDayEvents(true);
    }
  };

  const handleShowForm = () => {
    setShowDayEvents(false);
    setShowEventInfo(false);
    setShowEventForm(true);
  };

  const handleShowEventInfo = (event, origin) => {
    if (origin === "MyEvents") {
      setViaMyEvents(true);
      setShowMyEvents(false);
    }
    setSelectedEvent(event);
    setShowDayEvents(false);
    setShowEventInfo(true);
  };

  const handleFormSubmit = (e, titleInput, timeInput, icon) => {
    const title = titleInput;
    const time = timeInput;
    const date = dateObj.date;
    const month = dateObj.month;
    const year = dateObj.year;

    if (title === "") {
      setErrorMessage("You must provide a title");
      return;
    }
    let newEvent = {
      title,
      time,
      icon,
      date,
      month,
      year
    };

    if (selectedEvent) {
      editEvent(newEvent, selectedEvent.id);
      setSelectedEvent(null);
    } else {
      //generating id here so don't have to wait for db to provide one (required for draggable id)
      newEvent.id = uuid.v4();
      addEvent(newEvent);
    }
    setShowEventForm(false);
    setShowDayEvents(true);
  };

  //DELETE
  const handleDeleteEvent = () => {
    deleteEvent(selectedEvent.id);
    setShowEventInfo(false);
    setSelectedEvent(null);
    setShowDayEvents(true);
  };

  const handleModalContentClick = e => {
    if (
      e.target.classList.contains("event-form__icon-button") ||
      e.target.classList.contains("event-form__clock")
    ) {
      return;
    } else {
      setShowIcons(false);
      setShowTimeList(false);
    }
  };

  return (
    <div
      className={`modal ${theme === "Dark" ? "modal--dark" : "modal--light"}`}
      onClick={closeModals}
    >
      <div className="modal__content" onClick={handleModalContentClick}>
        {!showMyEvents && !showSettings && <ModalHeader />}
        {showDayEvents && (
          <DayEvents
            handleShowForm={handleShowForm}
            handleShowEventInfo={handleShowEventInfo}
            eventsOnThisDay={eventsOnThisDay}
            closeModals={closeModals}
            holidaysOnThisDay={holidaysOnThisDay}
          />
        )}

        {showEventForm && (
          <EventForm
            setShowEventForm={setShowEventForm}
            setShowDayEvents={setShowDayEvents}
            handleFormSubmit={handleFormSubmit}
            selectedEvent={selectedEvent}
            handleGoBack={handleGoBack}
            showIcons={showIcons}
            setShowIcons={setShowIcons}
            showTimeList={showTimeList}
            setShowTimeList={setShowTimeList}
            errorMessage={errorMessage}
            closeModals={closeModals}
          />
        )}

        {showEventInfo && (
          <EventInfo
            selectedEvent={selectedEvent}
            setShowEventInfo={setShowEventInfo}
            setSelectedEvent={setSelectedEvent}
            setShowDayEvents={setShowDayEvents}
            handleDeleteEvent={handleDeleteEvent}
            handleShowForm={handleShowForm}
            handleGoBack={handleGoBack}
            closeModals={closeModals}
          />
        )}
        {showMyEvents && (
          <MyEvents
            handleShowEventInfo={handleShowEventInfo}
            closeModals={closeModals}
          />
        )}
        {showSettings && <Settings />}
      </div>
    </div>
  );
};

export default ModalContainer;
