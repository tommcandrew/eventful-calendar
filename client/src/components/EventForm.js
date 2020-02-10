import React, { useContext, useState } from "react";
import TimeList from "./TimeList";
import LanguageContext from "../context/LanguageContext";
import DeviceContext from "../context/DeviceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faClock } from "@fortawesome/free-solid-svg-icons";

import {
  addTextOptions,
  charLimitTextOptions,
  eventTitleTextOptions
} from "../data/otherText";
import Icons from "./Icons";

const EventForm = ({
  handleFormSubmit,
  selectedEvent,
  handleGoBack,
  showIcons,
  setShowIcons,
  showTimeList,
  setShowTimeList,
  errorMessage,
  closeModals
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
    if (value.length > 40) {
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

  const closeIcons = () => {
    setShowIcons(false);
  };

  return (
    <div className="event-form">
      <button
        className="back-button--modal"
        onClick={handleGoBack}
        title="Back"
      ></button>
      <form className="event-form__form" onSubmit={getFormValues}>
        <div className="event-form__preview">
          {titleInput && (
            <span className="event-form__title-preview"> {titleInput}</span>
          )}
          {selectedTime && (
            <span className="event-form__time-preview">
              <em>{selectedTime}</em>
            </span>
          )}
          {selectedIcon && <span>{selectedIcon}</span>}
        </div>
        <div className="event-form__form-fields">
          <div className="event-form__form-field">
            <input
              type="text"
              id="event-title"
              name="title"
              maxLength="40"
              value={titleInput}
              onChange={e => handleTitleInput(e.target.value)}
              placeholder={eventTitleTextOptions[language]}
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
              type="button"
              // role="img"
              // aria-label="add time"
              className="event-form__clock"
              title="Add time"
              onClick={() => setShowTimeList(!showTimeList)}
            >
              <FontAwesomeIcon
                icon={faClock}
                className="clock"
                // onClick={() => setShowIcons(!showIcons)}
              />
            </button>
            {showTimeList && (
              <TimeList
                handleSelectTime={handleSelectTime}
                setShowTimeList={setShowTimeList}
              />
            )}

            <button
              type="button"
              // role="img"
              // aria-label="add icon"
              title="Add icon"
              className="event-form__icon-button"
              onClick={e => {
                console.log(e.target.parentNode.classList);
                setShowIcons(!showIcons);
              }}
            >
              <FontAwesomeIcon
                icon={faBirthdayCake}
                className="cake"
                // onClick={() => setShowIcons(!showIcons)}
              />
            </button>
            {showIcons && (
              <Icons
                handleSelectIcon={handleSelectIcon}
                closeIcons={closeIcons}
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
