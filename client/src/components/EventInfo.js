import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import { editTextOptions, deleteTextOptions } from "../data/otherText";

const EventInfo = ({
  selectedEvent,
  handleDeleteEvent,
  handleShowForm,
  handleGoBack,
  closeModals
}) => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="event-info">
      <button className="back-button--modal" onClick={handleGoBack}></button>
      <div className="event-info__content">
        <div className="event-info__event">
          <h2>{selectedEvent.title}</h2>
          {selectedEvent.time && (
            <h3 className="event-info__time">{selectedEvent.time}</h3>
          )}
          {selectedEvent.icon && <h3>{selectedEvent.icon}</h3>}
        </div>
      </div>
      <div className="event-info__buttons">
        <button onClick={handleShowForm} className="event-info__button">
          {editTextOptions[language]}
        </button>
        <button onClick={handleDeleteEvent} className="event-info__button">
          {deleteTextOptions[language]}
        </button>
      </div>
    </div>
  );
};

export default EventInfo;
