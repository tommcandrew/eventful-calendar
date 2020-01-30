import React, { useState } from "react";
import TimePicker from "./TimePicker";

const EventForm = ({ handleFormSubmit, selectedEvent, handleGoBack }) => {
  const [titleInput, setTitleInput] = useState(
    selectedEvent ? selectedEvent.title : ""
  );

  const [timeInput, setTimeInput] = useState(
    selectedEvent ? selectedEvent.time : ""
  );

  const [timePeriodInput, setTimePeriodInput] = useState(
    selectedEvent ? selectedEvent.timePeriod : "am"
  );

  const getFormValues = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const time = timeInput;
    const timePeriod = timePeriodInput;
    handleFormSubmit(e, title, time, timePeriod);
  };

  const handleTitleInput = value => {
    if (value.length > 45) {
      return;
    } else {
      setTitleInput(value);
    }
  };

  const handleTimeInput = e => {
    setTimeInput(e.target.value);
  };

  const handleTimePeriodInput = e => {
    setTimePeriodInput(e.target.value);
  };

  return (
    <div className="event-form">
      <button
        className="back-button--modal"
        onClick={handleGoBack}
        title="Back"
      >
        ‹
      </button>
      <form className="event-form__form" onSubmit={getFormValues}>
        <div className="event-form__form-fields">
          <div className="event-form__form-field">
            {/* <label htmlFor="event-title">Title*</label> */}
            <input
              type="text"
              id="event-title"
              name="title"
              maxLength="45"
              value={titleInput}
              onChange={e => handleTitleInput(e.target.value)}
              placeholder="Event title..."
            />
            <p
              className={`event-form__char-limit-message${
                titleInput.length > 44 ? "--show" : ""
              }`}
            >
              *Maximum 45 characters
            </p>
          </div>
          <TimePicker
            timeInput={timeInput}
            timePeriodInput={timePeriodInput}
            onTimeChange={handleTimeInput}
            onTimePeriodChange={handleTimePeriodInput}
          />
        </div>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default EventForm;
