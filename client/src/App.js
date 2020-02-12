import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Calendar from "./0-components/Calendar";
import Home from "./0-components/Home";
import ProtectedRoute from "./0-components/ProtectedRoute";
import Login from "./0-components/Login";
import Register from "./0-components/Register";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
