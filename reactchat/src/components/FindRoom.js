import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function FindRoom(props) {
  const history = useHistory();
  const { socket } = props;
  const [state, setState] = useState({
    rooms: [
      { id: 1, name: "testRoom1" },
      { id: 2, name: "testRoom2" },
      { id: 3, name: "testRoom3" },
    ],
    currentRoom: "",
    // currentMessages: [],
  });

  useEffect(() => {
    socket.emit("getRooms")

    socket.on('rooms', (rooms) => {
      // console.log("client socket received rooms");
      console.log(rooms);
      setState({ ...state, rooms });
    });
  }, []);

  const goToRoom = (roomId) => {
    return () => history.push(`/rooms/${roomId}`);
  };

  return (
    <div>
      {state.rooms.map((room, index) => (
        <div key={index} onClick={goToRoom(room.id)}>
          {room.name}
        </div>
      ))}
    </div>
  );
}
