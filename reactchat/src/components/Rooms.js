import React from "react";
import { useHistory } from "react-router-dom";

export default function Rooms(props) {
  const history = useHistory();

  const goToRoom = (e) => {
    history.push(`/rooms/${e.target.dataset.id}`);
  };
  return (
    <div className="rooms">
      {props.rooms.map((room, index) => (
        <div key={index} data-id={room.id} onClick={goToRoom}>
          {room.name}
        </div>
      ))}
    </div>
  );
}
