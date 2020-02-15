import React, { useContext } from "react";
import getCellClassNames from "../1-utils/getCellClassNames";
import getDayEvents from "../1-utils/getDayEvents";
import getDayHoverMessages from "../1-utils/getDayHoverMessages";
import getHolidayNames from "../1-utils/getHolidayNames";
import sortEvents from "../1-utils/sortEvents";
import DeviceContext from "../2-context/DeviceContext";
import EventsContext from "../2-context/EventsContext";
import HolidaysContext from "../2-context/HolidaysContext";
import { Droppable } from "react-beautiful-dnd";
import BlankCellContent from "./BlankCellContent";
import EventBar from "./EventBar";
import HolidayBar from "./HolidayBar";
import HoverMessages from "./HoverMessages";

const Day = ({ day, handleShowModalContainer, index, yearView }) => {
  const { device } = useContext(DeviceContext);
  const { events } = useContext(EventsContext);
  const { holidays } = useContext(HolidaysContext);

  //generate date string to use as droppableId but also as a way to get the new date after user drops item (parsed in EventsContext)
  const dayDateString = day.date.toString();
  const dayMonthString = day.month.toString();
  const dayYearString = day.year.toString();
  const fullDayDateString =
    dayDateString + "-" + dayMonthString + "-" + dayYearString;

  //get array of events on this day
  const eventsOnThisDay = getDayEvents(events, day);

  //order events chronologically
  if (eventsOnThisDay && eventsOnThisDay.length > 1) {
    sortEvents(eventsOnThisDay);
  }

  //get array of holidays on this day
  const holidayNames = getHolidayNames(holidays, day, device);

  //only space for 4 events so, if more, render just one EventBar with message saying number of events (user can click to see list)
  let eventsToDisplay;
  if (eventsOnThisDay.length + holidayNames.length <= 4) {
    eventsToDisplay = [...eventsOnThisDay];
  } else {
    eventsToDisplay = [{ title: `${eventsOnThisDay.length} events...` }];
  }

  //get array of classNames for this cell based on events, holidays etc.
  let classNames = getCellClassNames({
    index,
    day,
    holidayNames,
    eventsOnThisDay
  });

  //get array of messages to show when user hovers (holidays, number of events)
  const hoverMessages = getDayHoverMessages(
    holidayNames,
    eventsOnThisDay,
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
      {yearView && hoverMessages && hoverMessages.length > 0 && (
        <HoverMessages hoverMessages={hoverMessages} />
      )}

      {day.date === -1 && <BlankCellContent date={day.date} />}
      {day.date !== -1 && (
        <>
          <div className="cell__content">
            <div className="cell__date">{day.date}</div>

            {!yearView && holidayNames && (
              <div className="cell__holiday-names">
                {holidayNames.map((holiday, index) => (
                  <HolidayBar holiday={holiday} key={"holiday" + index} />
                ))}
              </div>
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
                      eventsToDisplay &&
                      eventsToDisplay.length > 0 &&
                      eventsToDisplay.map((event, index) => (
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
