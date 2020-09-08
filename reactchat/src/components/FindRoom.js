import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import socket from "../socket/socketConnection";
import Room from "./Room";

export default function FindRoom(props) {
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
      setState({ ...state, rooms });
    });
  }, []);

  // reformat this so that it receives the event object instead of roomId
  const goToRoom = (e) => {
    history.push(`/rooms/${e.target.dataset.id}`);
  };

  return (
    <>
      <Row className='red justify-content-md-center'>
        <Col className="rooms blue" xs={2} sm={3}>
          {state.rooms.map((room, index) => (
            <div key={index} data-id={room.id} onClick={goToRoom}>
              {room.name}
            </div>
          ))}
        </Col>

        <Col className="messages blue" >
          <Route path="/rooms/:roomId">
            <Room socket={socket} />
          </Route>
        </Col>

        <Col className="details black d-none d-sm-block" sm={2} >
            <div>Room Details</div>
        </Col>
      </Row>
      </>
  );
}
