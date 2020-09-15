import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RightNav from "./RightNav";
import RoomMessages from "./RoomMessages";
import RoomDetails from "./RoomDetails";
import AddMessage from "./AddMessage";

export default function Room(props) {
  const { socket, username, room, messages, sendMessage } = props;
  const { roomId } = useParams();

  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    socket.emit("joinRoom", roomId);
  }, [roomId]);

  const changeDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="right d-flex flex-column">
      <RightNav room={room} changeDetails={changeDetails} username={username} />

      <div className="currentRoom">
        <div className="roomMain">
          <RoomMessages socket={socket} messages={messages} username={username} />
          <AddMessage sendMessage={sendMessage} />
        </div>
        {showDetails && <RoomDetails />}
      </div>
    </div>
  );
}
