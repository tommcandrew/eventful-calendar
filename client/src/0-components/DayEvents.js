import React, { useContext } from "react";
import HolidaysContext from "../2-context/HolidaysContext";
import LanguageContext from "../2-context/LanguageContext";
import {
  noEventsTextOptions,
  eventsOnThisDayTextOptions,
  addEventTextOptions
} from "../3-data/siteText";

const DayEvents = ({
  eventsOnThisDay,
  handleShowEventInfo,
  handleShowForm,
  holidaysOnThisDay
}) => {
  const { showHolidays } = useContext(HolidaysContext);
  const { language } = useContext(LanguageContext);
  return (
    <div className="day-events">
      {holidaysOnThisDay &&
        holidaysOnThisDay.length > 0 &&
        showHolidays &&
        holidaysOnThisDay.map((holiday, index) => (
          <span
            key={"holiday-name" + index}
            className="day-events__holiday-name"
          >
            {holiday}
          </span>
        ))}
      <h2 className="day-events__title">
        {eventsOnThisDayTextOptions[language]}:
      </h2>
      {!eventsOnThisDay ||
        (eventsOnThisDay.length === 0 && (
          <h3>{noEventsTextOptions[language]}</h3>
        ))}
      {eventsOnThisDay &&
        eventsOnThisDay.length > 0 &&
        eventsOnThisDay.map((event, index) => {
          return (
            <div
              className="day-events__event"
              key={index}
              onClick={() => handleShowEventInfo(event)}
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
