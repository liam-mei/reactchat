import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Room(props) {
  const { socket } = props;
  const { roomId } = useParams();
  const [state, setState] = useState({
    currentRoom: {},
    currentMessages: [],
  });

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    socket.on("currentMessages", (currentMessages) => {
      console.log(currentMessages);
      setState({ ...state, currentMessages });
    });
  }, [socket]);
  return (
    <div>
      {state.currentMessages.map((message) => (
        <div key={message.id}>{message.message}</div>
      ))}
    </div>
  );
}
