import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";

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
