import React from "react";
import ReactDOM from "react-dom";
import { DateContextProvider } from "./2-context/DateContext";
import { EventsContextProvider } from "./2-context/EventsContext";
import { LanguageContextProvider } from "./2-context/LanguageContext";
import { ThemeContextProvider } from "./2-context/ThemeContext";
import { AuthContextProvider } from "./2-context/AuthContext";
import { HolidaysContextProvider } from "./2-context/HolidaysContext";
import { DeviceContextProvider } from "./2-context/DeviceContext";
import App from "./App";
import "./4-styles/styles.scss";

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
