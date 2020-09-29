import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RightNav from "./RightNav";
import RoomMessages from "./RoomMessages";
import RoomDetails from "./RoomDetails";
import AddMessage from "./AddMessage";

export default function Room(props) {
  const { socket, rooms, sendMessage } = props;
  const { roomId } = useParams();
  const username = localStorage.getItem("username");

  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    socket.emit("getRoom", roomId);
    console.log("getting room");
  }, [socket, roomId]);

  const changeDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="right d-flex flex-column">
      <RightNav
        room={rooms["r" + roomId] || {name: ''}}
        username={username}
        changeDetails={changeDetails}
      />

      <div className="currentRoom">
        <div className="roomMain">
          <RoomMessages
            messages={rooms['r' + roomId] ? rooms["r" + roomId].messages : [{name: 'adsf', user: {username:''}}]}
            username={username}
          />
          <AddMessage sendMessage={sendMessage} roomId={roomId} />
        </div>
        {showDetails && <RoomDetails room={rooms[roomId]} />}
      </div>
    </div>
  );
}
