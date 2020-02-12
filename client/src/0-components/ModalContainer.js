import React, { useState, useContext } from "react";
import getDayEvents from "../1-utils/getDayEvents";
import getDayHolidays from "../1-utils/getDayHolidays";
import DateContext from "../2-context/DateContext";
import EventsContext from "../2-context/EventsContext";
import HolidaysContext from "../2-context/HolidaysContext";
import uuid from "uuid";
import ModalHeader from "./ModalHeader";
import DayEvents from "./DayEvents";
import EventForm from "./EventForm";
import EventInfo from "./EventInfo";
import MyEvents from "./MyEvents";
import Settings from "./Settings";

const ModalContainer = ({
  closeModals,
  setShowMyEvents,
  showMyEvents,
  showSettings
}) => {
  const [showDayEvents, setShowDayEvents] = useState(
    !showMyEvents && !showSettings && true
  );
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventInfo, setShowEventInfo] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  //putting these here because I want modal content onClick (in this component) to hide icons/time list in EventForm
  const [showIcons, setShowIcons] = useState(false);
  const [showTimeList, setShowTimeList] = useState(false);
  //using this so back button in EventInfo goes to correct component (there are two routes)
  const [viaMyEvents, setViaMyEvents] = useState(null);

  const { events, addEvent, editEvent, deleteEvent } = useContext(
    EventsContext
  );
  const { dateObj } = useContext(DateContext);
  const { holidays } = useContext(HolidaysContext);

  const eventsOnThisDay = getDayEvents(events, dateObj);
  const holidaysOnThisDay = getDayHolidays(holidays, dateObj);

  const handleGoBack = () => {
    setSelectedEvent(null);
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

    //if user clicked on edit button to get to form, then selectedEvent will be truthy
    if (selectedEvent) {
      editEvent(newEvent, selectedEvent.id);
      setSelectedEvent(null);
    } else {
      //adding an id generated here so don't have to wait for db to provide one (required for draggable id)
      newEvent.id = uuid.v4();
      addEvent(newEvent);
    }
    setShowEventForm(false);
    setShowDayEvents(true);
  };

  const handleDeleteEvent = () => {
    deleteEvent(selectedEvent.id);
    setShowEventInfo(false);
    setSelectedEvent(null);
    setShowDayEvents(true);
  };

  //close Icons and TimeList if user clicks anywhere outside
  const handleModalContentClick = e => {
    if (
      e.target.classList.contains("event-form__icon-button") ||
      e.target.parentNode.classList.contains("event-form__icon-button") ||
      e.target.parentNode.classList.contains("fa-birthday-cake") ||
      e.target.classList.contains("event-form__clock") ||
      e.target.parentNode.classList.contains("fa-clock")
    ) {
      return;
    } else {
      setShowIcons(false);
      setShowTimeList(false);
    }
  };

  return (
    <div className="modal" onClick={closeModals}>
      <div className="modal__content" onClick={handleModalContentClick}>
        <span className="modal__close-button" onClick={e => closeModals(e)}>
          &times;
        </span>
        {showEventForm ||
          (showEventInfo && (
            <button
              className="back-button--modal"
              onClick={handleGoBack}
              title="Go back"
            ></button>
          ))}
        {!showMyEvents && !showSettings && <ModalHeader />}
        {showDayEvents && (
          <DayEvents
            eventsOnThisDay={eventsOnThisDay}
            handleShowEventInfo={handleShowEventInfo}
            handleShowForm={handleShowForm}
            holidaysOnThisDay={holidaysOnThisDay}
          />
        )}
        {showEventForm && (
          <EventForm
            errorMessage={errorMessage}
            handleFormSubmit={handleFormSubmit}
            selectedEvent={selectedEvent}
            setShowIcons={setShowIcons}
            setShowTimeList={setShowTimeList}
            showIcons={showIcons}
            showTimeList={showTimeList}
          />
        )}

        {showEventInfo && (
          <EventInfo
            handleDeleteEvent={handleDeleteEvent}
            handleShowForm={handleShowForm}
            selectedEvent={selectedEvent}
          />
        )}
        {showMyEvents && <MyEvents handleShowEventInfo={handleShowEventInfo} />}
        {showSettings && <Settings />}
      </div>
    </div>
  );
};

export default ModalContainer;
