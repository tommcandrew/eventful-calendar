import React, { useState, createContext } from "react";

export const EventsContext = createContext();

const EventsContextProvider = props => {
  const [events, setEvents] = useState([]);
  const addEvent = newEvent => {
    const updatedArray = events.concat(newEvent);
    setEvents(updatedArray);
  };

  const deleteEvent = id => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
  };

  const editEvent = (event, id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    updatedEvents.push(event);
    setEvents(updatedEvents);
  };

  const moveEvent = (title, newDate) => {
    const newDay = parseInt(newDate.split("-")[0]);
    let updatedEvents = [];
    for (let i = 0; i < events.length; i++) {
      if (events[i].title === title) {
        events[i].date = newDay;
      }
      updatedEvents.push(events[i]);
    }
    setEvents(updatedEvents);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        deleteEvent,
        editEvent,
        moveEvent
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContextProvider;
