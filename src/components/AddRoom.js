import React, { useState, useEffect } from "react";
import { useDebounce } from "../utils/useDebounce";

import RightNav from "./RightNav";

export default function AddRoom(props) {
  const { socket } = props;
  // users are the added users
  const [users, setUsers] = useState([{ username: "someUser", id: 1 }]);
  // room name
  const [roomName, setRoomName] = useState("someRoomName");
  // username being searched
  const [searchUsers, setSearchUsers] = useState("someUserName");
  // array is users matching string
  const [foundUsers, setFoundUsers] = useState([{}]);
  const [show, setShow] = useState(true);

  // use effect needs socket listener
  useEffect(() => {
    socket.on("foundUsers", (users) => {
      setFoundUsers(users);
    });
  });

  useDebounce(()=> {
    socket.emit('searchUsers', searchUsers)
    console.log('i was debounced')
    console.log(searchUsers)
  }, 500, [searchUsers])

  const removeUser = (indexToRemove) => {
    setUsers([
      ...users.splice(0, indexToRemove),
      ...users.splice(indexToRemove + 1),
    ]);
  };

  return (
    <div className="right d-flex flex-column">
      <RightNav
        roomName="Create Room"
        username={localStorage.getItem("username")}
      />
      <div>
        <div>Room Name</div>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room Name (Optional)"
        />
        <div>
          <div>Users</div>
          <div className="searchUsers">
            <div>
              {users.map((user, index) => (
                <div>
                  <div>{user.username}</div>
                  <div onClick={() => removeUser(index)}>x</div>
                </div>
              ))}
            </div>
            <input
              className="searchUsersInput"
              type="text"
              value={searchUsers}
              onChange={(e) => setSearchUsers(e.target.value)}
              onFocus={() => setShow(true)}
              onBlur={() => setShow(false)}
            />
            <div
              style={show ? { display: "initial" } : { display: "none" }}
              className="searchUsersDropdown"
            >
              this is a dropdown
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
