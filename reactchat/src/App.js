import React, { useEffect, useState } from "react";
import "./App.css";

import socket from "./socket/socketConnection";

function App() {
  const [rooms, setRooms] = useState([""]);

  useEffect(() => {
    socket.on("rooms", (rooms) => {
      console.log("client socket received rooms");
      setRooms(rooms);
    });
  }, []);
  return (
    <div>
      <div>
        {rooms.map((room) => (
          <div>{room}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
