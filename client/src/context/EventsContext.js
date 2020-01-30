import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const EventsContext = createContext();

export const EventsContextProvider = props => {
  const [events, setEvents] = useState(null);
  const { authenticated } = useContext(AuthContext);

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
