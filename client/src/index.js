import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DateContextProvider } from "./context/DateContext";
import { EventsContextProvider } from "./context/EventsContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <DateContextProvider>
    <AuthContextProvider>
      <EventsContextProvider>
        <App />
      </EventsContextProvider>
    </AuthContextProvider>
  </DateContextProvider>,
  document.getElementById("root")
);
