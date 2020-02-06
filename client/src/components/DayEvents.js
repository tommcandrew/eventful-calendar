import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import {
  noEventsTextOptions,
  eventsOnThisDayTextOptions,
  addEventTextOptions
} from "../data/otherText";
import DeviceContext from "../context/DeviceContext";

const DayEvents = ({
  handleShowForm,
  handleShowEventInfo,
  eventsOnThisDay,
  closeModals
}) => {
  const { language } = useContext(LanguageContext);
  const { device } = useContext(DeviceContext);
  return (
    <div className="day-events">
      {device !== "desktop" && (
        <span
          className="day-events__close-button"
          onClick={e => closeModals(e)}
        >
          &times;
        </span>
      )}
      <h2>{eventsOnThisDayTextOptions[language]}:</h2>
      {!eventsOnThisDay ||
        (eventsOnThisDay.length === 0 && (
          <h3>{noEventsTextOptions[language]}</h3>
        ))}
      {eventsOnThisDay &&
        eventsOnThisDay.length > 0 &&
        eventsOnThisDay.map((event, index) => {
          return (
            <div
              key={index}
              onClick={() => handleShowEventInfo(event)}
              className="day-events__event"
            >
              <span className="day-events__event-title">{event.title}</span>
              {event.time && (
                <span className="day-events__event-time">{event.time}</span>
              )}
              {event.icon && (
                <span className="day-events__event-icon">{event.icon}</span>
              )}
            </div>
          );
        })}
      <button onClick={handleShowForm} className="day-events__button">
        {addEventTextOptions[language]}
      </button>
    </div>
  );
};

export default DayEvents;
