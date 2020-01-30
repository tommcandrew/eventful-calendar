import React from "react";

const DayEvents = ({
  handleShowForm,
  handleShowEventInfo,
  eventsOnThisDay
}) => {
  return (
    <div className="day-events">
      {!eventsOnThisDay || (eventsOnThisDay.length === 0 && <h2>No events</h2>)}
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
        Add Event
      </button>
    </div>
  );
};

export default DayEvents;
