import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RightNav from "./RightNav";
import RoomMessage from "./RoomMessage";
import RoomDetails from "./RoomDetails";
import AddMessage from "./AddMessage";

export default function Room(props) {
  const { socket, username, room, messages, sendMessage } = props;
  const { roomId } = useParams();

  const [showDetails, setShowDetails] = useState(true);

  // const [messages, setMessages] = useState([
  //   { message: "fakeMessage1", User: { username: "fakeuser1" } },
  // ]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);
  }, [roomId]);

  const changeDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="right d-flex flex-column">
      <RightNav room={room} changeDetails={changeDetails} />

      <div className="currentRoom d-flex">
        <div className="roomMain">
          <div className="messages">
            {messages.map((message, i) => (
              <RoomMessage key={i} message={message} username={username} />
            ))}
          </div>
          <AddMessage sendMessage={sendMessage} />
        </div>
        {showDetails && <RoomDetails />}
      </div>
    </div>
  );
}
