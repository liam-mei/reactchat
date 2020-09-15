import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
// import io from "socket.io-client";

import socket from "../socket/socketConnection";
import LeftNav from "./LeftNav";
import Rooms from "./Rooms";
import Room from "./Room";

export default function Chat(props) {
  const username = localStorage.getItem("username");
  // const socket = io.connect("http://localhost:5000");
  // const {socket} = props;

  const token = localStorage.getItem("token");
  const [currentRoom, setCurrentRoom] = useState({});
  const [messages, setMessages] = useState([
    { message: "fakeMessage1", User: { username: "fakeuser1" } },
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
  }, [messages]);

  const sendMessage = (message) => {
    // console.log({ currentRoom });
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
      <div className="left d-flex flex-column">
        <LeftNav socket={socket} />
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
