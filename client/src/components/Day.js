import React, { useContext } from "react";
import EventsContext from "../context/EventsContext";
import { Droppable, Draggable } from "react-beautiful-dnd";
import sortEvents from "../utils/sortEvents";

const Day = ({ day, yearView, handleShowModalContainer, index, holidays }) => {
  const d = new Date();
  const currentMonth = d.getMonth();
  const currentDate = d.getDate();
  const currentYear = d.getFullYear();
  const { eventsLocal } = useContext(EventsContext);
  const dayDateString = day.date.toString();
  const dayMonthString = day.month.toString();
  const dayYearString = day.year.toString();
  const fullDayDateString =
    dayDateString + "-" + dayMonthString + "-" + dayYearString;

  const eventsOnThisDay = [];

  if (eventsLocal && eventsLocal.length > 0) {
    if (day.date !== -1) {
      for (let i = 0; i < eventsLocal.length; i++) {
        if (
          eventsLocal[i].month === day.month &&
          eventsLocal[i].date === day.date &&
          eventsLocal[i].year === day.year
        ) {
          eventsOnThisDay.push(eventsLocal[i]);
        }
      }
    }
  }

  const holidaysOnThisDay = [];
  if (holidays && holidays.length > 0 && day.date !== -1) {
    for (let i = 0; i < holidays.length; i++) {
      if (
        holidays[i].date.datetime.year === day.year &&
        holidays[i].date.datetime.month === day.month + 1 &&
        holidays[i].date.datetime.day === day.date
      ) {
        holidaysOnThisDay.push(holidays[i]);
      }
    }
  }

  if (eventsOnThisDay && eventsOnThisDay.length > 1) {
    sortEvents(eventsOnThisDay);
  }

  let classNames = "cell ";
  let abbreviatedEvents;

  if (day.date === -1) {
    classNames = classNames.concat(" cell--blank");
  } else {
    classNames = classNames.concat(" cell--day");
  }

  if (
    day.month === currentMonth &&
    day.date === currentDate &&
    day.year === currentYear
  ) {
    classNames = classNames.concat(" cell--today");
  }

  if (index === 35 && day.date === -1) {
    classNames = classNames.concat(" hideRow");
  }

  if ([5, 6, 12, 13, 19, 20, 26, 27, 33, 34].includes(index)) {
    classNames = classNames.concat(" cell--weekend");
  }

  if (eventsOnThisDay.length > 0) {
    classNames = classNames.concat(" cell--with-event");
    abbreviatedEvents = eventsOnThisDay.map(event => {
      if (event.title > 17) {
        event.title = event.title.substr(0, 14) + "...";
        return event;
      } else {
        return event;
      }
    });
    //only space for 5 events in cell so, if more, just say how many there are (user can click to see list)
    if (abbreviatedEvents.length > 5) {
      abbreviatedEvents = [{ title: `${abbreviatedEvents.length} events...` }];
    }
  }

  let holidayNames;
  if (holidaysOnThisDay.length > 0) {
    classNames = classNames.concat(" cell--with-holiday");
    holidayNames = holidaysOnThisDay.map(holiday => holiday.name);
  }

  let hoverMessages = [];

  if (yearView) {
    if (classNames.includes("cell--today")) {
      hoverMessages.push("Today");
    }

    if (holidayNames && holidayNames.length > 0) {
      holidayNames.forEach((holidayName, index) => {
        hoverMessages.push(holidayName);
      });
    }

    if (eventsOnThisDay && eventsOnThisDay.length > 0) {
      hoverMessages.push(
        <em>
          You have {eventsOnThisDay.length} event
          {eventsOnThisDay.length > 1 ? "s" : ""} on this day.
        </em>
      );
    }
  }

  return (
    <div
      className={classNames}
      onClick={e =>
        !yearView &&
        e.currentTarget.classList.contains("cell--day") &&
        handleShowModalContainer(e)
      }
    >
      {hoverMessages && hoverMessages.length > 0 && (
        <div className="cell__hover-messages">
          {hoverMessages.map((message, index) => (
            <div key={index + "message"}>{message}</div>
          ))}
        </div>
      )}

      {day.date === -1 && (
        <div className="cell__content">
          <span className="cell--blank">{day.date}</span>
        </div>
      )}
      {day.date !== -1 && (
        <>
          <div className="cell__content">
            <div className="cell__date">{day.date}</div>

            {!yearView && holidayNames && (
              <div className="cell__holiday-names">
                {holidayNames.map((holidayName, index) => (
                  <div
                    key={index + "holiday-title"}
                    className="cell__holiday-name"
                  >
                    {holidayName}
                  </div>
                ))}
              </div>
            )}

            {!yearView && (
              <Droppable droppableId={fullDayDateString}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="cell__event-titles"
                  >
                    {!yearView &&
                      abbreviatedEvents &&
                      abbreviatedEvents.map((event, index) => (
                        <Draggable
                          index={index}
                          draggableId={event.id}
                          key={event.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              key={index + "event-title"}
                              className="cell__event-title"
                            >
                              <span> {event.title}</span>
                              <span> {event.time && event.time}</span>
                              <span> {event.icon && event.icon}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Day;
