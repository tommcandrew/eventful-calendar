import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import {
  eventSavedTextOptions,
  eventDeletedTextOptions
} from "../data/otherText";
import LanguageContext from "./LanguageContext";

const EventsContext = createContext();

export const EventsContextProvider = props => {
  const { authenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [events, setEvents] = useState(null);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (authenticated) {
      fetchEvents();
    }
  }, [authenticated]);

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setAlert("");
    }, 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alert]);

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
        setAlert(eventSavedTextOptions[language]);
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
        setAlert(eventSavedTextOptions[language]);
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
        setAlert(eventDeletedTextOptions[language]);
      });
  };

  const editEvent = (editedEvent, id) => {
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        event.time = editedEvent.time;
        event.title = editedEvent.title;
        event.date = editedEvent.date;
        event.icon = editedEvent.icon;
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
        setAlert(eventSavedTextOptions[language]);
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
        moveEvent,
        alert
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
