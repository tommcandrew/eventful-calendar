import React, { useState, createContext, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import LanguageContext from "./LanguageContext";
import {
  eventSavedTextOptions,
  eventDeletedTextOptions
} from "../3-data/siteText";
import axios from "axios";

const EventsContext = createContext();

export const EventsContextProvider = props => {
  const [events, setEvents] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);
  const { authenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (authenticated) {
      fetchEvents();
    }
  }, [authenticated]);

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setAlertInfo(null);
    }, 5000);
    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertInfo]);

  const fetchEvents = async () => {
    const token = localStorage.getItem("my-token");
    const res = await axios.get("/api/events", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    setEvents(res.data);
  };

  const addEvent = newEvent => {
    //update state then update database after (this pattern repeated in functions below)
    setEvents([...events, newEvent]);
    const token = localStorage.getItem("my-token");
    axios
      .post(
        "/api/addevent",
        newEvent,

        {
          headers: { authorization: "Bearer " + token },
          timeout: 2500
        }
      )
      .then(() => {
        //fetch and set events again (do I need to do any check/comparison here?)
        fetchEvents();
        setAlertInfo({ text: eventSavedTextOptions[language], success: true });
      })
      .catch(err => {
        setAlertInfo({ text: "Event not saved.", success: false });
      });
  };

  const moveEvent = (id, newDate) => {
    //the droppableId (of cell) is stringified (full) date so extract date from it
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
        "/api/moveevent/" + id,
        { newDay },
        {
          headers: { authorization: "Bearer " + token }
        }
      )
      .then(() => {
        fetchEvents();
        setAlertInfo({ text: eventSavedTextOptions[language], success: true });
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
      .delete(`/api/deleteevent/${id}`, {
        headers: { authorization: "Bearer " + token }
      })
      .then(() => {
        fetchEvents();
        setAlertInfo({
          text: eventDeletedTextOptions[language],
          success: true
        });
      })
      .catch(err => {
        console.log(err);
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
      .post("/api/editevent/" + id, editedEvent, {
        headers: { authorization: "Bearer " + token }
      })
      .then(() => {
        fetchEvents();
        setAlertInfo({ text: eventSavedTextOptions[language], success: true });
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
        alertInfo
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
