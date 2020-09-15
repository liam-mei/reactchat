import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Rooms(props) {
  const history = useHistory();
  const { socket, setCurrentRoom } = props;

  const [rooms, setRooms] = useState([
    { id: 1, name: "fakeRoom1" },
    { id: 2, name: "fakeRoom2" },
    { id: 3, name: "fakeRoom3" },
  ]);

  useEffect(() => {
    socket.emit("getRooms");
    socket.on("rooms", (rooms) => {
      console.log(rooms);
      setRooms(rooms);
      setCurrentRoom(rooms[0]);
      history.push(`/rooms/${rooms[0].id}`);
    });
    return () => {
      socket.off("rooms");
    };
  },[]);

  const goToRoom = (e) => {
    history.push(`/rooms/${e.target.dataset.id}`);
    setCurrentRoom(JSON.parse(e.target.dataset.room));
  };
  return (
    <div className="rooms">
      {rooms.map((room, index) => (
        <div
          key={index}
          data-id={room.id}
          data-room={JSON.stringify(room)}
          onClick={goToRoom}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
}
