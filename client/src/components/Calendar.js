import React, { useEffect, useState, useContext } from "react";
import createYearArray from "../utils/createYearArray";
import View from "./View";
import DateContext from "../context/DateContext";
import Modal from "./Modal";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import EventsContext from "../context/EventsContext";

const Calendar = () => {
  const [yearArray, setYearArray] = useState(null);
  const [showWholeYear, setShowWholeYear] = useState(true);
  const [showModalContainer, setShowModalContainer] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [holidays, setHolidays] = useState([]);

  const { dateObj, setDateObj } = useContext(DateContext);
  const { moveEvent } = useContext(EventsContext);

  const onDragEnd = result => {
    const { draggableId, destination } = result;
    moveEvent(draggableId, destination.droppableId);
  };

  useEffect(() => {
    if (dateObj) {
      const yearArray = createYearArray(dateObj.year);
      setYearArray(yearArray);

      axios
        .get(
          `https://calendarific.com/api/v2/holidays?&api_key=bb4313c99b956fe470dc7c996850b622abbae5fc&country=Uk&year=${dateObj.year}`
        )
        .then(res => {
          setHolidays(
            res.data.response.holidays.filter(
              holiday =>
                holiday.type.includes("National holiday") ||
                holiday.type.includes("Common local holiday")
            )
          );
        });
    }
  }, [dateObj]);

  const closeModals = e => {
    if (e.target.classList.contains("modal")) {
      setShowModalContainer(false);
      setShowMyEvents(false);
    }
  };

  const setMonthView = monthIndex => {
    setDateObj({ ...dateObj, month: monthIndex });
    setShowWholeYear(false);
  };

  const setYear = year => {
    setDateObj({ ...dateObj, year });
  };

  const setMonth = monthIndex => {
    if (monthIndex === 12) {
      setDateObj({ ...dateObj, year: dateObj.year + 1, month: 0 });
      return;
    }
    if (monthIndex === -1) {
      setDateObj({ ...dateObj, year: dateObj.year - 1, month: 11 });
      return;
    }
    setDateObj({ ...dateObj, month: monthIndex });
  };

  const handleShowModalContainer = e => {
    const selectedDate = parseInt(
      e.currentTarget.firstChild.firstChild.textContent
    );
    setDateObj({ ...dateObj, date: selectedDate });
    setShowModalContainer(true);
  };

  const handleShowMyEvents = () => {
    setShowMyEvents(true);
    setShowModalContainer(true);
  };

  if (dateObj && yearArray) {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="calendar">
            <View
              yearArray={yearArray}
              setMonthView={setMonthView}
              setYear={setYear}
              showWholeYear={showWholeYear}
              setShowWholeYear={setShowWholeYear}
              setMonth={setMonth}
              handleShowModalContainer={handleShowModalContainer}
              handleShowMyEvents={handleShowMyEvents}
              holidays={holidays}
            />
          </div>
          {showModalContainer && (
            <Modal
              closeModals={closeModals}
              showMyEvents={showMyEvents}
              setShowMyEvents={setShowMyEvents}
            />
          )}
        </DragDropContext>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Calendar;
