import React from "react";

const EventInfo = ({
  selectedEvent,
  handleDeleteEvent,
  handleShowForm,
  handleGoBack
}) => {
  return (
    <div className="event-info">
      <button className="back-button--modal" onClick={handleGoBack}>
        ‹
      </button>
      <div className="event-info__content">
        <div className="event-info__event">
          <h2>{selectedEvent.title}</h2>
          {selectedEvent.time && (
            <h3>{selectedEvent.time + selectedEvent.timePeriod}</h3>
          )}
        </div>
      </div>
      <div className="event-info__buttons">
        <button onClick={handleShowForm} className="button">
          Edit
        </button>
        <button onClick={handleDeleteEvent} className="button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventInfo;