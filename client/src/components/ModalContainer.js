import React, { useState, useContext } from "react";
import ModalHeader from "./ModalHeader";
import DayEvents from "./DayEvents";
import EventForm from "./EventForm";
import EventInfo from "./EventInfo";
import EventsContext from "../context/EventsContext";
import DateContext from "../context/DateContext";
import MyEvents from "./MyEvents";
import uuid from "uuid";
import Settings from "./Settings";

const ModalContainer = ({
  closeModals,
  showMyEvents,
  setShowMyEvents,
  showSettings
}) => {
  const [showDayEvents, setShowDayEvents] = useState(!showMyEvents && true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viaMyEvents, setViaMyEvents] = useState(null);
  //putting these here because I want modal content onClick (in this component) to hide icons in EventForm
  const [showIcons, setShowIcons] = useState(false);

  const {
    eventsLocal,
    addEventLocal,
    editEventLocal,
    deleteEventLocal
  } = useContext(EventsContext);
  const { dateObj } = useContext(DateContext);

  const eventsOnThisDay = [];

  if (eventsLocal !== null) {
    if (dateObj.date || dateObj.date === 0) {
      for (let i = 0; i < eventsLocal.length; i++) {
        if (
          eventsLocal[i].month === dateObj.month &&
          eventsLocal[i].date === dateObj.date &&
          eventsLocal[i].year === dateObj.year
        ) {
          eventsOnThisDay.push(eventsLocal[i]);
        }
      }
    }
  }

  //MANAGING MODALS

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

  //EVENT CRUD OPERATIONS

  //ADD & EDIT
  const handleFormSubmit = (e, titleInput, timeInput, icon) => {
    const title = titleInput;
    const time = timeInput;
    const date = dateObj.date;
    const month = dateObj.month;
    const year = dateObj.year;
    //generating id here so don't have to wait for db to provide one
    const id = uuid.v4();
    if (title === "") {
      alert("you must provide a title");
      return;
    }
    const newEvent = {
      title,
      time,
      icon,
      date,
      month,
      year,
      id
    };

    if (selectedEvent) {
      editEventLocal(newEvent, selectedEvent._id);
      setSelectedEvent(null);
    } else {
      addEventLocal(newEvent);
    }
    setShowEventForm(false);
    setShowDayEvents(true);
  };

  //DELETE
  const handleDeleteEvent = () => {
    deleteEventLocal(selectedEvent._id);
    setShowEventInfo(false);
    setSelectedEvent(null);
    setShowDayEvents(true);
  };

  const handleModalContentClick = e => {
    if (e.target.classList.contains("event-form__icon-button")) {
      return;
    } else {
      setShowIcons(false);
    }
  };

  return (
    <div className="modal" onClick={closeModals}>
      <div className="modal__content" onClick={handleModalContentClick}>
        {!showMyEvents && !showSettings && <ModalHeader />}
        {showDayEvents && (
          <DayEvents
            handleShowForm={handleShowForm}
            handleShowEventInfo={handleShowEventInfo}
            eventsOnThisDay={eventsOnThisDay}
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
          />
        )}
        {showMyEvents && <MyEvents handleShowEventInfo={handleShowEventInfo} />}
        {showSettings && <Settings />}
      </div>
    </div>
  );
};

export default ModalContainer;
