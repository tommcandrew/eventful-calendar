import React, { useContext } from "react";
import EventsContext from "../context/EventsContext";
import { Droppable, Draggable } from "react-beautiful-dnd";
import sortEvents from "../utils/sortEvents";
import getClassNames from "../utils/getClassNames";
import HoverMessages from "./HoverMessages";
import BlankCellContent from "./BlankCellContent";
import HolidayList from "./HolidayList";

const Day = ({ day, yearView, handleShowModalContainer, index, holidays }) => {
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

  if (eventsOnThisDay && eventsOnThisDay.length > 1) {
    sortEvents(eventsOnThisDay);
  }

  let classNames = getClassNames({
    index,
    day,
    holidaysOnThisDay
  });

  let holidayNames;

  holidayNames = holidaysOnThisDay.map(holiday => holiday.name);

  let abbreviatedEvents;

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
    //only space for 5 events in cell so, if more, just tell user how many there are (they can click to see list)
    if (abbreviatedEvents.length > 5) {
      abbreviatedEvents = [{ title: `${abbreviatedEvents.length} events...` }];
    }
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
        <HoverMessages hoverMessages={hoverMessages} />
      )}

      {day.date === -1 && <BlankCellContent date={day.date} />}
      {day.date !== -1 && (
        <>
          <div className="cell__content">
            <div className="cell__date">{day.date}</div>

            {!yearView && holidayNames && (
              <HolidayList holidayNames={holidayNames} />
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
                              {event.time && (
                                <span> {event.time && event.time}</span>
                              )}
                              {event.icon && (
                                <span> {event.icon && event.icon}</span>
                              )}
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
