import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Rooms(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { rooms } = props;

  const goToRoom = (e) => {
    history.push(`/rooms/${e.target.dataset.id}`);
  };
  return (
    <div className="rooms">
      {Object.keys(rooms).map((key) => (
        <div
          style={{order: rooms[key].order}}
          key={rooms[key].id}
          data-id={rooms[key].id}
          onClick={goToRoom}
          className={`room ${
            pathname === "/rooms/" + rooms[key].id && "active"
          }`}
        >
          {rooms[key].name}
        </div>
      ))}
    </div>
  );
}
