import React, { useContext, useState } from "react";
import TimeList from "./TimeList";
import { eventTitleTextOptions } from "../data/otherText";
import LanguageContext from "../context/LanguageContext";
import { addTextOptions } from "../data/otherText";
import Icons from "./Icons";

const EventForm = ({
  handleFormSubmit,
  selectedEvent,
  handleGoBack,
  showIcons,
  setShowIcons,
  showTimeList,
  setShowTimeList
}) => {
  const { language } = useContext(LanguageContext);

  const [titleInput, setTitleInput] = useState(
    selectedEvent ? selectedEvent.title : ""
  );

  const [selectedIcon, setSelectedIcon] = useState(
    selectedEvent ? selectedEvent.icon : ""
  );

  const [selectedTime, setSelectedTime] = useState(
    selectedEvent ? selectedEvent.time : ""
  );

  const getFormValues = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const time = selectedTime;
    handleFormSubmit(e, title, time, selectedIcon);
  };

  const handleTitleInput = value => {
    if (value.length > 45) {
      return;
    } else {
      setTitleInput(value);
    }
  };

  const handleSelectIcon = e => {
    if (!e.target.classList.contains("icon")) {
      return;
    } else {
      setSelectedIcon(e.target.innerText);
      setShowIcons(false);
    }
  };

  const handleSelectTime = e => {
    if (!e.target.classList.contains("time-option")) {
      return;
    } else {
      setSelectedTime(e.target.innerText);
      setShowTimeList(false);
    }
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
        <div className="event-form__preview">
          {titleInput && (
            <span className="event-form__title-preview"> {titleInput}</span>
          )}
          {selectedTime && (
            <span className="event-form__time-preview">{selectedTime}</span>
          )}
          {selectedIcon && <span>{selectedIcon}</span>}
        </div>
        <div className="event-form__form-fields">
          <div className="event-form__form-field">
            <input
              type="text"
              id="event-title"
              name="title"
              maxLength="45"
              value={titleInput}
              onChange={e => handleTitleInput(e.target.value)}
              placeholder={eventTitleTextOptions[language]}
            />
            <p
              className={`event-form__char-limit-message${
                titleInput.length > 44 ? "--show" : ""
              }`}
            >
              *Maximum 45 characters
            </p>
          </div>
          <div className="event-form__extra-inputs">
            <span
              role="img"
              aria-label="add time"
              className="event-form__clock"
              title="Add time"
              onClick={() => setShowTimeList(!showTimeList)}
            >
              &#128338;
            </span>
            {showTimeList && <TimeList handleSelectTime={handleSelectTime} />}
            <span
              role="img"
              aria-label="add icon"
              title="Add icon"
              className="event-form__icon-button"
              onClick={() => setShowIcons(!showIcons)}
            >
              &#127874;
            </span>
            {showIcons && <Icons handleSelectIcon={handleSelectIcon} />}
          </div>
        </div>
        <button className="event-form__button" type="submit">
          {addTextOptions[language]}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
