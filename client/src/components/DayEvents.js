import React, { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import { noEventsTextOptions } from "../data/otherText";
import { addEventTextOptions } from "../data/otherText";

const DayEvents = ({
  handleShowForm,
  handleShowEventInfo,
  eventsOnThisDay
}) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="day-events">
      {!eventsOnThisDay ||
        (eventsOnThisDay.length === 0 && (
          <h2>{noEventsTextOptions[language]}</h2>
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
              {event.time && <span>{event.time + event.timePeriod}</span>}
            </div>
          );
        })}
      <button onClick={handleShowForm} className="button">
        {addEventTextOptions[language]}
      </button>
    </div>
  );
};

export default DayEvents;
