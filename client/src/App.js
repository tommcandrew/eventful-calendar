import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
