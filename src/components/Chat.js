import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { SocketContext } from "../contexts/SocketContext";

import LeftNav from "./LeftNav";
import Rooms from "./Rooms";
import Room from "./Room";
import AddRoom from "./AddRoom";

export default function Chat(props) {
  const username = localStorage.getItem("username");
  const { socket } = useContext(SocketContext);

  const [order, setOrder] = useState(-1);
  const [rooms, setRooms] = useState({
    r1: {
      id: 1,
      name: "testRoom1",
      users: [{}],
      messages: [{ message: "testMessage", user: { username: "user2" } }],
      order: 0,
    },
  });

  useEffect(() => {
    socket.on("userRooms", (rooms) => {
      console.log({ rooms });
      setRooms(rooms);
    });

    socket.on("newMessage", (newMessage) => {
      // newMessage should have 2 properties, room and message
      console.log({ newMessage });
      setOrder(order - 1);
      setRooms({
        ...rooms,
        [newMessage.room]: {
          ...rooms[newMessage.room],
          messages: [...rooms[newMessage.room].messages, newMessage.message],
          order,
        },
      });
    });

    socket.on("currentRoom", (currentRoom) => {
      // order does not need to change when selecting room.  Only when messages update
      // setOrder(order - 1);
      // currentRoom.order = order;
      // console.log({ currentRoom });
      setRooms({ ...rooms, ["r" + currentRoom.id]: currentRoom });
    });
    return () => {
      socket.off("newMessage");
      socket.off("currentRoom");
      socket.off("rooms");
    };
  }, [order, rooms, socket]);

  const sendMessage = (message, id) => {
    setOrder(order - 1);
    const currentRoom = rooms["r" + id];
    currentRoom.order = order;
    const newMessage = {
      message,
      user: { username },
      roomId: id,
      users: currentRoom.users,
    };

    setRooms({
      ...rooms,
      ["r" + id]: {
        ...currentRoom,
        order,
        messages: [...currentRoom.messages, newMessage],
      },
    });
    socket.emit("sendMessage", newMessage);
  };

  return (
    <div className="chat d-flex">
      <Route path="/rooms">
        <div className="left d-flex flex-column">
          <LeftNav socket={socket} />
          <Rooms rooms={rooms} username={username} socket={socket} />
        </div>
      </Route>

      <Route path="/rooms/new">
        <AddRoom socket={socket} />
      </Route>

      <Route path="/rooms/t/:roomId">
        <Room socket={socket} rooms={rooms} sendMessage={sendMessage} />
      </Route>
    </div>
  );
}
