import React, { useContext, useState } from "react";
import LanguageContext from "../2-context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  addTextOptions,
  charLimitTextOptions,
  eventTitleTextOptions
} from "../3-data/otherText";
import Icons from "./Icons";
import TimeList from "./TimeList";

const EventForm = ({
  errorMessage,
  handleFormSubmit,
  selectedEvent,
  setShowIcons,
  setShowTimeList,
  showIcons,
  showTimeList
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
    handleFormSubmit(e, titleInput, selectedTime, selectedIcon);
  };

  const handleTitleInput = value => {
    //char limit message also shown below input (see form below)
    if (value.length > 40) {
      return;
    } else {
      setTitleInput(value);
    }
  };

  const handleSelectIcon = e => {
    if (!e.target.classList.contains("icons__icon")) {
      return;
    } else {
      setSelectedIcon(e.target.innerText);
      setShowIcons(false);
    }
  };

  const handleSelectTime = e => {
    if (!e.target.classList.contains("time-list__time-option")) {
      return;
    } else {
      setSelectedTime(e.target.innerText);
      setShowTimeList(false);
    }
  };

  return (
    <div className="event-form">
      <form className="event-form__form" onSubmit={getFormValues}>
        <div className="event-form__preview">
          {titleInput && (
            <span className="event-form__title-preview"> {titleInput}</span>
          )}
          {selectedTime && (
            <span className="event-form__time-preview">{selectedTime}</span>
          )}
          {selectedIcon && (
            <span className="event-form__icon-preview">{selectedIcon}</span>
          )}
        </div>
        <div className="event-form__form-fields">
          <div className="event-form__form-field">
            <input
              id="event-title"
              maxLength="40"
              name="title"
              onChange={e => handleTitleInput(e.target.value)}
              placeholder={eventTitleTextOptions[language]}
              type="text"
              value={titleInput}
            />
            <p
              className={`event-form__char-limit-message${
                titleInput.length > 39 ? "--show" : ""
              }`}
            >
              {charLimitTextOptions[language]}
            </p>
          </div>
          <div className="event-form__extra-inputs">
            <button
              className="event-form__clock"
              title="Add time"
              type="button"
            >
              <FontAwesomeIcon
                icon={faClock}
                className="clock"
                onClick={() => setShowTimeList(!showTimeList)}
              />
            </button>
            {showTimeList && (
              <TimeList
                handleSelectTime={handleSelectTime}
                setShowTimeList={setShowTimeList}
              />
            )}
            <button
              className="event-form__icon-button"
              title="Add icon"
              type="button"
            >
              <FontAwesomeIcon
                icon={faBirthdayCake}
                className="cake"
                onClick={e => {
                  console.log(e.target.parentNode.classList);
                  setShowIcons(!showIcons);
                }}
              />
            </button>
            {showIcons && (
              <Icons
                handleSelectIcon={handleSelectIcon}
                setShowIcons={setShowIcons}
              />
            )}
          </div>
          <div className="event-form__error-message">{errorMessage}</div>
        </div>
        <button className="event-form__button" type="submit">
          {addTextOptions[language]}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
