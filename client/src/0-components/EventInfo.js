import React, { useContext } from "react";
import LanguageContext from "../2-context/LanguageContext";
import { editTextOptions, deleteTextOptions } from "../3-data/otherText";

const EventInfo = ({ handleDeleteEvent, handleShowForm, selectedEvent }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="event-info">
      <div className="event-info__content">
        <p className="event-info__event">
          <span className="event-info__event-title">{selectedEvent.title}</span>
          {selectedEvent.time && (
            <span className="event-info__event-time">{selectedEvent.time}</span>
          )}
          {selectedEvent.icon && (
            <span className="event-info__event-icon">{selectedEvent.icon}</span>
          )}
        </p>
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
