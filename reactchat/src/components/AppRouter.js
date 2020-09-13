import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Chat from "./Chat";
import ProtectedRoute from "../utils/ProtectedRoute";
import getToken from "../utils/getToken";

export default function AppRouter(props) {
  const hasToken = getToken();

  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>

      <ProtectedRoute
        path="/rooms"
        render={(props) => <Chat {...props} />}
      />

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
