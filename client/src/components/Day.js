import React, { useContext } from "react";
import EventsContext from "../context/EventsContext";
import { Droppable } from "react-beautiful-dnd";
import sortEvents from "../utils/sortEvents";
import getClassNames from "../utils/getClassNames";
import HoverMessages from "./HoverMessages";
import BlankCellContent from "./BlankCellContent";
import HolidayList from "./HolidayList";
import getDayEvents from "../utils/getDayEvents";
import getHolidayNames from "../utils/getHolidayNames";
import getEventNames from "../utils/getEventNames";
import getDayHoverMessages from "../utils/getDayHoverMessages";
import EventBar from "./EventBar";
import DeviceContext from "../context/DeviceContext";
import HolidaysContext from "../context/HolidaysContext";

const Day = ({ day, yearView, handleShowModalContainer, index }) => {
  const { events } = useContext(EventsContext);
  const dayDateString = day.date.toString();
  const dayMonthString = day.month.toString();
  const dayYearString = day.year.toString();
  const fullDayDateString =
    dayDateString + "-" + dayMonthString + "-" + dayYearString;
  const { device } = useContext(DeviceContext);
  const { holidays } = useContext(HolidaysContext);

  //get array of events on this day
  const eventsOnThisDay = getDayEvents(events, day);

  //sort events on this day according to time
  if (eventsOnThisDay && eventsOnThisDay.length > 1) {
    sortEvents(eventsOnThisDay);
  }

  //get array of just names of events on this day (abbreviated if too long)
  const eventNames = getEventNames(eventsOnThisDay, device);

  //get array of holidays on this day
  const holidayNames = getHolidayNames(holidays, day, device);

  //get array of classNames for this cell based on events, holidays etc.
  let classNames = getClassNames({
    index,
    day,
    holidayNames,
    eventsOnThisDay
  });

  //get array of hover messages (holidays, number of events)
  const hoverMessages = getDayHoverMessages(
    holidayNames,
    eventsOnThisDay,
    yearView,
    classNames
  );

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
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="cell__event-titles"
                  >
                    {!yearView &&
                      eventNames &&
                      eventNames.length > 0 &&
                      eventNames.map((event, index) => (
                        <EventBar
                          index={index}
                          event={event}
                          key={"eventbar" + index}
                        />
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
