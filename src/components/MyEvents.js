import React, { useContext, useState, useEffect } from "react";
import { EventsContext } from "../context/EventsContext";

const MyEvents = ({ handleShowEventInfo }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEvents, setSelectedEvents] = useState(null);
  const { events } = useContext(EventsContext);

  useEffect(() => {
    const filteredEvents = events.filter(event => event.year === selectedYear);
    setSelectedEvents(filteredEvents);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, events]);

  return (
    <div className="my-events">
      <h1>My Events</h1>
      <div className="my-events-nav">
        <div className="my-events-nav-content">
          <button
            className="my-events-arrow-left"
            onClick={() => setSelectedYear(selectedYear - 1)}
          >
            ‹
          </button>
          <button className="my-events-year-name">{selectedYear}</button>
          <button
            className="my-events-arrow-right"
            onClick={() => setSelectedYear(selectedYear + 1)}
          >
            ›
          </button>
        </div>
      </div>
      <div className="events-container">
        {selectedEvents &&
          selectedEvents.map(event => {
            return (
              <>
                <div
                  className="my-events-event"
                  onClick={() => handleShowEventInfo(event, "MyEvents")}
                >
                  <span className="event-title">{event.title}</span>
                  {event.time && <span>{event.time}</span>}
                  {event.timePeriod && <span>{event.timePeriod}</span>}
                </div>
              </>
            );
          })}
        {!selectedEvents ||
          (selectedEvents.length === 0 && (
            <div className="event-details">
              {!selectedEvents ||
                (selectedEvents.length === 0 && <h2>No events</h2>)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyEvents;
