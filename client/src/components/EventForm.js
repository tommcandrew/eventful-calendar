import React, { useContext, useState } from "react";
import TimePicker from "./TimePicker";
import { eventTitleTextOptions } from "../data/otherText";
import LanguageContext from "../context/LanguageContext";
import { addTextOptions } from "../data/otherText";
import Icons from "./Icons";

const EventForm = ({
  handleFormSubmit,
  selectedEvent,
  handleGoBack,
  showIcons,
  setShowIcons
}) => {
  const { language } = useContext(LanguageContext);

  const [titleInput, setTitleInput] = useState(
    selectedEvent ? selectedEvent.title : ""
  );

  const [timeInput, setTimeInput] = useState(
    selectedEvent ? selectedEvent.time : ""
  );

  const [selectedIcon, setSelectedIcon] = useState("");

  const getFormValues = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const time = timeInput;
    handleFormSubmit(e, title, time, selectedIcon);
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

  const handleSelectIcon = e => {
    if (!e.target.classList.contains("icon")) {
      return;
    } else {
      setSelectedIcon(e.target.innerText);
      setShowIcons(false);
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
            <button
              type="button"
              className="event-form__icon-button"
              onClick={() => setShowIcons(!showIcons)}
            >
              &#127874;
            </button>
            {showIcons && <Icons handleSelectIcon={handleSelectIcon} />}
            <TimePicker timeInput={timeInput} onTimeChange={handleTimeInput} />
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
