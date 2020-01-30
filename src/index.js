import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DateContextProvider from "./context/DateContext";

ReactDOM.render(
  <DateContextProvider>
    <App />
  </DateContextProvider>,
  document.getElementById("root")
);
