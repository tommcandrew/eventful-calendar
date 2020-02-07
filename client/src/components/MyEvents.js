import React, { useContext, useState, useEffect } from "react";
import EventsContext from "../context/EventsContext";
import LanguageContext from "../context/LanguageContext";
import { myEventsTextOptions } from "../data/otherText";
import { noEventsTextOptions } from "../data/otherText";

const MyEvents = ({ handleShowEventInfo, closeModals }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEvents, setSelectedEvents] = useState(null);
  const { events } = useContext(EventsContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const filteredEvents = events.filter(event => event.year === selectedYear);
    setSelectedEvents(filteredEvents);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, events]);

  return (
    <div className="my-events">
      <span className="my-events__close-button" onClick={e => closeModals(e)}>
        &times;
      </span>
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
      <div className="my-events__events-container">
        {selectedEvents &&
          selectedEvents.map((event, index) => {
            return (
              <React.Fragment key={"event" + index}>
                <div
                  className="my-events__event"
                  onClick={() => handleShowEventInfo(event, "MyEvents")}
                >
                  {event.icon && <span>{event.icon}</span>}
                  <span className="my-event__event-title">{event.title}</span>
                  {event.time && <span>{event.time}</span>}
                </div>
              </React.Fragment>
            );
          })}
        {!selectedEvents ||
          (selectedEvents.length === 0 && (
            <div className="my-event__event-details">
              {!selectedEvents ||
                (selectedEvents.length === 0 && (
                  <h2>{noEventsTextOptions[language]}</h2>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyEvents;
