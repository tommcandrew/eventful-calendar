import React, { useContext, useState, useEffect } from "react";
import EventsContext from "../2-context/EventsContext";
import LanguageContext from "../2-context/LanguageContext";
import DateContext from "../2-context/DateContext";
import { myEventsTextOptions, noEventsTextOptions } from "../3-data/siteText";
import months from "../3-data/months";
import sortEvents from "../1-utils/sortEvents";

const MyEvents = ({ handleShowEventInfo }) => {
  const { events } = useContext(EventsContext);
  const { language } = useContext(LanguageContext);
  const { dateObj } = useContext(DateContext);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [selectedYear, setSelectedYear] = useState(dateObj.year);

  useEffect(() => {
    const filteredEvents = events.filter(event => event.year === selectedYear);
    const orderedEvents = sortEvents(filteredEvents);
    setSelectedEvents(orderedEvents);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  return (
    <div className="my-events">
      <h1>{myEventsTextOptions[language]}</h1>
      <div className="my-events__nav">
        <div className="my-events__nav-content">
          <button
            className="my-events__arrow-left"
            onClick={() => setSelectedYear(selectedYear - 1)}
          >
            ‹
          </button>
          <button className="my-events__year-name">{selectedYear}</button>
          <button
            className="my-events__arrow-right"
            onClick={() => setSelectedYear(selectedYear + 1)}
          >
            ›
          </button>
        </div>
      </div>
      <div className="my-events__events">
        {selectedEvents &&
          selectedEvents.map((event, index) => {
            return (
              <React.Fragment key={"event" + index}>
                <div
                  className="my-events__event"
                  onClick={() => handleShowEventInfo(event, "MyEvents")}
                >
                  {event.icon && (
                    <span className="my-events__event-icon">{event.icon}</span>
                  )}
                  <span className="my-events__event-title">{event.title}</span>
                  {event.time && (
                    <span className="my-events__event-time">{event.time}</span>
                  )}
                  <div className="my-events__event-date-info">
                    <span className="my-events__event-date">{event.date}</span>
                    <span className="my-events__event-month">
                      {months[language][event.month + 1]}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        {!selectedEvents ||
          (selectedEvents.length === 0 && (
            <div className="my-event__event-details">
              {!selectedEvents ||
                (selectedEvents.length === 0 && (
                  <h2 className="my-events__no-events">
                    {noEventsTextOptions[language]}
                  </h2>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyEvents;
