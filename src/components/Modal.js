import React, { useState, useContext } from "react";
import ModalHeader from "./ModalHeader";
import DayEvents from "./DayEvents";
import EventForm from "./EventForm";
import EventInfo from "./EventInfo";
import { EventsContext } from "../context/EventsContext";
import { DateContext } from "../context/DateContext";
import MyEvents from "./MyEvents";

const Modal = ({ closeModals, showMyEvents, setShowMyEvents }) => {
  const [showDayEvents, setShowDayEvents] = useState(!showMyEvents && true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viaMyEvents, setViaMyEvents] = useState(null);

  const { events, addEvent, editEvent, deleteEvent } = useContext(
    EventsContext
  );
  const { dateObj } = useContext(DateContext);

  const eventsOnThisDay = [];

  if (events !== null) {
    if (dateObj.date || dateObj.date === 0) {
      for (let i = 0; i < events.length; i++) {
        if (
          events[i].month === dateObj.month &&
          events[i].date === dateObj.date &&
          events[i].year === dateObj.year
        ) {
          eventsOnThisDay.push(events[i]);
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

  //event CRUD operations

  const d = new Date();

  //ADD & EDIT
  const handleFormSubmit = (e, titleInput, timeInput, timePeriodInput) => {
    debugger;
    const title = titleInput;
    const time = timeInput;
    let timePeriod = timePeriodInput;
    const date = dateObj.date;
    const month = dateObj.month;
    const year = dateObj.year;
    const id = d.getTime();
    if (title === "") {
      alert("you must provide a title");
      return;
    }
    if (time === "") {
      timePeriod = "";
    }

    const newEvent = {
      title,
      time,
      timePeriod,
      date,
      month,
      year,
      id
    };

    if (selectedEvent) {
      editEvent(newEvent, selectedEvent.id);
      setSelectedEvent(null);
    } else {
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

  return (
    <div className="modal" onClick={closeModals}>
      <div className="modal__content">
        {!showMyEvents && <ModalHeader />}
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
      </div>
    </div>
  );
};

export default Modal;
