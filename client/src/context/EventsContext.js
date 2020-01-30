import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const EventsContext = createContext();

export const EventsContextProvider = props => {
  const { authenticated } = useContext(AuthContext);
  //using local verion of events (and methods below) to avoid lag when dragging and dropping
  const [events, setEvents] = useState(null);
  const [eventsLocal, setEventsLocal] = useState(null);

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

  useEffect(() => {
    setEventsLocal(events);
    console.log("fetched events: " + JSON.stringify(events));
  }, [events]);

  //LOCAL

  const addEventLocal = newEvent => {
    const updatedArray = eventsLocal.concat(newEvent);
    setEventsLocal(updatedArray);
    addEvent(newEvent);
  };

  const deleteEventLocal = id => {
    const updatedEvents = eventsLocal.filter(event => event.id !== id);
    setEventsLocal(updatedEvents);
    deleteEvent(id);
  };

  const editEventLocal = (event, id) => {
    const updatedEvents = eventsLocal.filter(event => event.id !== id);
    updatedEvents.push(event);
    setEventsLocal(updatedEvents);
    editEvent(event, id);
  };

  const moveEventLocal = (id, newDate) => {
    const newDay = parseInt(newDate.split("-")[0]);
    let updatedEvents = [];
    for (let i = 0; i < eventsLocal.length; i++) {
      if (eventsLocal[i].id === id) {
        eventsLocal[i].date = newDay;
      }
      updatedEvents.push(eventsLocal[i]);
    }
    setEventsLocal(updatedEvents);
    moveEvent(id, newDate);
  };

  //REMOTE

  const addEvent = newEvent => {
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

  const deleteEvent = id => {
    const token = localStorage.getItem("my-token");
    axios
      .delete(`/deleteevent/${id}`, {
        headers: { authorization: "Bearer " + token }
      })
      .then(() => {
        fetchEvents();
      });
  };

  const editEvent = (newEvent, id) => {
    const token = localStorage.getItem("my-token");
    axios
      .post("/editevent/" + id, newEvent, {
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
    const token = localStorage.getItem("my-token");
    const newDay = parseInt(newDate.split("-")[0]);
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <EventsContext.Provider
      value={{
        eventsLocal,
        addEventLocal,
        deleteEventLocal,
        editEventLocal,
        moveEventLocal
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
