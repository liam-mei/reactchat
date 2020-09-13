import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import socket from "../socket/socketConnection";
import Navbar from "./LeftNav";
import Rooms from "./Rooms";
import Room from "./Room";

export default function Chat(props) {
  const history = useHistory();
  const [state, setState] = useState({
    rooms: [
      { id: 1, name: "fakeRoom1" },
      { id: 2, name: "fakeRoom2" },
      { id: 3, name: "fakeRoom3" },
    ],
    currentRoom: {},
  });

  useEffect(() => {
    socket.emit("getRooms");

    socket.on("rooms", (rooms) => {
      console.log(rooms)
      setState({ rooms, currentRoom: rooms[0] });
      history.push(`/rooms/${rooms[0].id}`);
    });
    

  }, []);

  return (
    <div className="chat d-flex">
      <div className="left d-flex flex-column">
        <Navbar />
        <Rooms rooms={state.rooms} />
      </div>

      <Route path="/rooms/:roomId">
        <Room socket={socket} room={state.currentRoom} />
      </Route>
    </div>
  );
}
