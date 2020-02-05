import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DateContextProvider } from "./context/DateContext";
import { EventsContextProvider } from "./context/EventsContext";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { HolidaysContextProvider } from "./context/HolidaysContext";
import { DeviceContextProvider } from "./context/DeviceContext";
import "./styles/styles.scss";

ReactDOM.render(
  <DateContextProvider>
    <LanguageContextProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <EventsContextProvider>
            <HolidaysContextProvider>
              <DeviceContextProvider>
                <App />
              </DeviceContextProvider>
            </HolidaysContextProvider>
          </EventsContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </LanguageContextProvider>
  </DateContextProvider>,
  document.getElementById("root")
);
