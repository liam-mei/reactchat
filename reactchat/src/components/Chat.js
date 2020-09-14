import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import socket from "../socket/socketConnection";
import Navbar from "./LeftNav";
import Rooms from "./Rooms";
import Room from "./Room";

export default function Chat(props) {
  const username = localStorage.getItem("username");
  const [currentRoom, setCurrentRoom] = useState({});
  const [messages, setMessages] = useState([
    { message: "fakeMessage1", User: { username: "fakeuser1" } },
  ]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log({ newMessage: message });
      console.log({currentMessages: messages.slice()})
      setMessages([...messages, message]);
    });

    socket.on("currentMessages", (currentMessages) => {
      console.log({ joinRoomMessages: currentMessages });
      setMessages(currentMessages);
    });
    return () => {
      socket.off('newMessage');
    };
  }, [messages]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", {
      room_id: currentRoom.id,
      User: { username },
      message,
    });
    console.log({ messages });
    setMessages([...messages, { message, User: { username } }]);
  };

  return (
    <div className="chat d-flex">
      <div className="left d-flex flex-column">
        <Navbar />
        <Rooms socket={socket} setCurrentRoom={setCurrentRoom} />
      </div>

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
