import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import Register from "./Register";
import AddRoom from './AddRoom'
import ProtectedRoute from "../utils/ProtectedRoute";

export default function AppRouter(props) {

  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>

      <ProtectedRoute path="/rooms" render={(props) => <Chat {...props} />} />

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
