import React from "react";

const timeChoices = [
  "Choose time",
  "12:00",
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30"
];

const TimePicker = ({
  timeInput,
  timePeriodInput,
  onTimeChange,
  onTimePeriodChange
}) => {
  const selectOptions = timeChoices.map((time, index) => {
    return (
      <option key={index} value={time}>
        {time}
      </option>
    );
  });

  return (
    <div className="event-form__time-picker">
      <select
        name="time"
        value={timeInput}
        onChange={onTimeChange}
        className="event-form__time-input"
      >
        {selectOptions}
      </select>
      <select
        onChange={onTimePeriodChange}
        value={timePeriodInput}
        name="timePeriod"
        className="event-form__time-period-input"
      >
        <option value="Select">Select</option>
        <option value="am">am</option>
        <option value="pm">pm</option>
      </select>
    </div>
  );
};

export default TimePicker;
