import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Rooms(props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { rooms, username, socket } = props;
  console.log("rooms: ", rooms);

  const [room, setRoom] = useState("");
  const findRoom = (e) => {
    setRoom(e.target.value);
    socket.emit("searchRooms", e.target.value);
  };

  const goToRoom = (e) => {
    console.log(e.target);
    history.push(`/rooms/t/${e.target.dataset.id}`);
    // history.push(`/rooms/1`);
  };
  return (
    <div className="rooms">
      <input
        className="searchRooms rounded-pill"
        type="text"
        placeholder="Search Rooms"
        autoComplete="off"
        spellCheck="false"
        aria-label="Search Rooms"
        value={room}
        onChange={findRoom}
      />
      {Object.keys(rooms).map((key) => {
        const room = rooms[key];
        const lastMessage = room.messages[room.messages.length - 1] || {
          message: "",
          user: { username: "" },
        };
        // console.log(room.id);
        const lastUser = lastMessage.user.username;
        // console.log(username);
        const user = lastUser === username ? "you" : lastUser;
        return (
          <div
            style={{ order: room.order }}
            key={room.id}
            data-id={room.id}
            onClick={goToRoom}
            className={`room ${pathname === "/rooms/" + room.id && "active"}`}
          >
            <div data-id={room.id} className="roomName">
              {room.name}
            </div>
            <div className="roomDetail">
              <div data-id={room.id} className="user">
                {user}:
              </div>
              <div data-id={room.id} className="lastMessage">
                {lastMessage.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
