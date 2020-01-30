import React, { useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Day = ({ day, yearView, handleShowModalContainer, index, holidays }) => {
  const d = new Date();
  const currentMonth = d.getMonth();
  const currentDate = d.getDate();
  const currentYear = d.getFullYear();
  const { events } = useContext(EventsContext);
  const dayDateString = day.date.toString();
  const dayMonthString = day.month.toString();
  const dayYearString = day.year.toString();
  const fullDayDateString =
    dayDateString + "-" + dayMonthString + "-" + dayYearString;

  const eventsOnThisDay = [];

  if (events && events.length > 0) {
    if (day.date !== -1) {
      for (let i = 0; i < events.length; i++) {
        if (
          events[i].month === day.month &&
          events[i].date === day.date &&
          events[i].year === day.year
        ) {
          eventsOnThisDay.push(events[i]);
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

  let classNames = "cell ";
  let abbreviatedEventTitles;

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
    classNames = classNames.concat(" weekend");
  }

  if (eventsOnThisDay.length > 0) {
    classNames = classNames.concat(" cell--with-event");
    let eventTitles = eventsOnThisDay.map(event => event.title);
    if (eventTitles.length > 2) {
      abbreviatedEventTitles = [`${eventTitles.length} events...`];
    } else {
      abbreviatedEventTitles = eventTitles.map((title, index) => {
        if (title.length > 17) {
          return title.substr(0, 14) + "...";
        } else {
          return title;
        }
      });
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
          {hoverMessages.map(message => (
            <div>{message}</div>
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
                      abbreviatedEventTitles &&
                      abbreviatedEventTitles.map((title, index) => (
                        <Draggable
                          index={index}
                          draggableId={title}
                          key={title}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              key={index + "event-title"}
                              className="cell__event-title"
                            >
                              {title}
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
