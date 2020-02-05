import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const EventsContext = createContext();

export const EventsContextProvider = props => {
  const { authenticated } = useContext(AuthContext);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    if (authenticated) {
      fetchEvents();
    }
  }, [authenticated]);

  const fetchEvents = async () => {
    const token = localStorage.getItem("my-token");
    const res = await axios.get("/events", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    setEvents(res.data);
  };

  const addEvent = newEvent => {
    //update state (optimistically)
    setEvents([...events, newEvent]);

    //update database
    const token = localStorage.getItem("my-token");
    axios
      .post("/addevent", newEvent, {
        headers: { authorization: "Bearer " + token }
      })
      .then(() => {
        fetchEvents();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const moveEvent = (id, newDate) => {
    const newDay = parseInt(newDate.split("-")[0]);
    let updatedEvents = events.map(event => {
      if (event.id === id) {
        event.date = newDay;
      }
      return event;
    });
    setEvents(updatedEvents);

    const token = localStorage.getItem("my-token");
    axios
      .post(
        "/moveevent/" + id,
        { newDay },
        {
          headers: { authorization: "Bearer " + token }
        }
      )
      .then(() => {
        fetchEvents();
        console.log("database has been updated (moveEvent)");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteEvent = id => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    const token = localStorage.getItem("my-token");
    axios
      .delete(`/deleteevent/${id}`, {
        headers: { authorization: "Bearer " + token }
      })
      .then(() => {
        fetchEvents();
        console.log("database has been updated (deleteEvent)");
      });
  };

  const editEvent = (editedEvent, id) => {
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        event.time = editedEvent.time;
        event.title = editedEvent.title;
        event.date = editedEvent.date;
      }
      return event;
    });
    setEvents(updatedEvents);

    const token = localStorage.getItem("my-token");
    axios
      .post("/editevent/" + id, editedEvent, {
        headers: { authorization: "Bearer " + token }
      })
      .then(() => {
        fetchEvents();
        console.log("database has been updated (editEvent)");
      })
      .catch(err => {
        console.log(err);
      });
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

export default EventsContext;
