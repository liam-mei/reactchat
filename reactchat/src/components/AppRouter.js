import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import FindRoom from "./FindRoom";
// import Room from "./Room";
// import socket from "../socket/socketConnection";
import ProtectedRoute from "../utils/ProtectedRoute";
import getToken from "../utils/getToken";

export default function AppRouter(props) {
  const hasToken = getToken();

  return (
    <Switch>
      {/* <Route path="/login">
        <Login />
      </Route> */}
      <Route path="/register">
        <Register />
      </Route>


      {/* <Route path="/rooms/:roomId">
        {getToken() ? <Room socket={socket} /> : <Redirect to="/login" />}
      </Route>
      <Route path="/rooms">
        {getToken() ? <FindRoom socket={socket} /> : <Redirect to="/login" />}
      </Route> */}

      {/* <ProtectedRoute path="/rooms/:roomId" render={() => <Room socket={socket} />} /> */}

      <ProtectedRoute path="/rooms" render={(props) => <FindRoom {...props} />} />

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
