import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import FindRoom from "./FindRoom";
import Room from "./Room";
import socket from "../socket/socketConnection";

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/rooms/:roomId">
        <Room socket={socket} />
      </Route>
      <Route path="/rooms">
        <FindRoom socket={socket} />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
