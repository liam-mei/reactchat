import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";

import RightNav from "./RightNav";

export default function Room(props) {
  const { socket } = props;
  const { roomId } = useParams();
  const [state, setState] = useState({
    currentMessages: [],
    showDetails: true,
  });

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    socket.on("currentMessages", (currentMessages) => {
      console.log(currentMessages);
      setState({ ...state, currentMessages });
    });
  }, [roomId]);
  return (
    <div className="right d-flex flex-column">
      <RightNav room={props.room} />
      <div>
        {state.currentMessages.map((message) => (
          <div key={message.id}>{message.message}</div>
        ))}
        {state.showDetails && (
          <Col className=" details black d-none d-sm-block p-0 m-0" sm={2}>
            <div>Room Details</div>
          </Col>
        )}
      </div>
    </div>
  );
}
