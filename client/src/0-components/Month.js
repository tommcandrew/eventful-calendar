import React, { useContext } from "react";
import EventsContext from "../2-context/EventsContext";
import { DragDropContext } from "react-beautiful-dnd";
import Day from "./Day";
import MonthHeader from "./MonthHeader";
import Weekdays from "./Weekdays";

const Month = ({
  handleShowModalContainer,
  handleShowMyEvents,
  handleShowSettings,
  monthArray,
  monthIndex,
  setMonth,
  setMonthView,
  setShowDateSelect,
  setShowMyAccount,
  setShowWholeYear,
  setYear,
  showDateSelect,
  showMyAccount,
  yearView
}) => {
  const { moveEvent } = useContext(EventsContext);

  const onDragEnd = result => {
    const { draggableId, destination } = result;
    if (!destination) {
      return;
    }
    moveEvent(draggableId, destination.droppableId);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={`month ${
            yearView ? "month--year-view" : "month--month-view"
          }`}
        >
          <div
            className="month__content"
            onClick={setMonthView ? () => setMonthView(monthIndex) : null}
          >
            <MonthHeader
              handleShowMyEvents={handleShowMyEvents}
              handleShowSettings={handleShowSettings}
              monthIndex={monthIndex}
              setMonth={setMonth}
              setShowDateSelect={setShowDateSelect}
              setShowMyAccount={setShowMyAccount}
              setShowWholeYear={setShowWholeYear}
              setYear={setYear}
              showDateSelect={showDateSelect}
              showMyAccount={showMyAccount}
              yearView={yearView}
            />
            <Weekdays yearView={yearView} />
            <div className="month__cells">
              {monthArray &&
                monthArray.map((day, index) => {
                  return (
                    <Day
                      day={day}
                      handleShowModalContainer={handleShowModalContainer}
                      index={index}
                      key={index + "day"}
                      yearView={yearView}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Month;
