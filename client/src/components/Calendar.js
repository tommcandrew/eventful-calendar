import React, { useEffect, useState, useContext } from "react";
import createYearArray from "../utils/createYearArray";
import View from "./View";
import DateContext from "../context/DateContext";
import ModalContainer from "./ModalContainer";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import EventsContext from "../context/EventsContext";
import HolidaysContext from "../context/HolidaysContext";

const Calendar = () => {
  const [yearArray, setYearArray] = useState(null);
  const [showWholeYear, setShowWholeYear] = useState(true);
  const [showModalContainer, setShowModalContainer] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const { dateObj, setDateObj } = useContext(DateContext);
  const { moveEventLocal } = useContext(EventsContext);
  const { showHolidays } = useContext(HolidaysContext);

  useEffect(() => {
    if (showHolidays === "False") {
      setHolidays([]);
    }
  }, [showHolidays]);

  useEffect(() => {
    console.log("app mounted");
  }, []);

  const onDragEnd = result => {
    const { draggableId, destination } = result;
    if (!destination) {
      return;
    }
    moveEventLocal(draggableId, destination.droppableId);
  };

  useEffect(() => {
    if (dateObj) {
      const yearArray = createYearArray(dateObj.year);
      setYearArray(yearArray);

      if (showHolidays === "True") {
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
    }
  }, [dateObj]);

  const closeModals = e => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("button-done")
    ) {
      setShowModalContainer(false);
      setShowMyEvents(false);
      setShowSettings(false);
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

  const handleShowSettings = () => {
    setShowSettings(true);
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
              handleShowSettings={handleShowSettings}
              holidays={holidays}
            />
          </div>
          {showModalContainer && (
            <ModalContainer
              closeModals={closeModals}
              showMyEvents={showMyEvents}
              setShowMyEvents={setShowMyEvents}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
            />
          )}
        </DragDropContext>
      </>
    );
  } else {
    return <div className="loader"></div>;
  }
};

export default Calendar;
