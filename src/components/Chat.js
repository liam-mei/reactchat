import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { SocketContext } from "../contexts/SocketContext";

import LeftNav from "./LeftNav";
import Rooms from "./Rooms";
import Room from "./Room";

export default function Chat(props) {
  const username = localStorage.getItem("username");
  const { socket } = useContext(SocketContext);

  const token = localStorage.getItem("token");
  const [currentRoom, setCurrentRoom] = useState({});
  const [messages, setMessages] = useState([
    { message: "", User: { username: "" } },
  ]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log({ newMessage: message });
      setMessages([...messages, message]);
    });

    socket.on("currentMessages", (currentMessages) => {
      console.log({ joinRoomMessages: currentMessages });
      setMessages(currentMessages);
    });
    return () => {
      socket.off("newMessage");
      socket.off("currentMessages");
    };
  }, [messages, socket]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", {
      room_id: currentRoom.id,
      User: { username },
      message,
      token,
    });
    console.log({ messages });
    setMessages([...messages, { message, User: { username } }]);
  };

  return (
    <div className="chat d-flex">
      <Route path='/rooms'>
        <div className="left d-flex flex-column">
          <LeftNav socket={socket} />
          <Rooms socket={socket} setCurrentRoom={setCurrentRoom} />
        </div>
      </Route>
      <Route path="/rooms/:roomId">
        <Room
          socket={socket}
          room={currentRoom}
          username={username}
          messages={messages}
          sendMessage={sendMessage}
        />
      </Route>
    </div>
  );
}
