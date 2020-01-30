import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DateContextProvider from "./context/DateContext";
import EventsContextProvider from "./context/EventsContext";

ReactDOM.render(
  <DateContextProvider>
    <EventsContextProvider>
      <App />
    </EventsContextProvider>
  </DateContextProvider>,
  document.getElementById("root")
);
