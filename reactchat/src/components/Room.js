import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import RightNav from "./RightNav";
import RoomMessage from "./RoomMessage";
import RoomDetails from "./RoomDetails";
import AddMessage from "./AddMessage";

export default function Room(props) {
  const username = localStorage.getItem("username");
  const { socket } = props;
  const { roomId } = useParams();
  const [state, setState] = useState({
    currentMessages: [
      { message: "fakeMessage1", User: { username: "fakeuser1" } },
    ],
    showDetails: true,
  });

  useEffect(() => {
    socket.emit("joinRoom", roomId);
    socket.on("currentMessages", (currentMessages) => {
      console.log({ joinRoomMessages: currentMessages });
      setState({ ...state, currentMessages });
    });

    socket.on("newMessage", (message) => {
      console.log({ newMessage: message });
      console.log({ before: state });
      setState({
        showDetails: state.showDetails,
        currentMessages: [...state.currentMessages, message],
      });
      setTimeout(() => {
        console.log({ after: state.currentMessages });
      }, 2000);
    });
  }, [roomId]);

  const changeDetails = () => {
    setState({ ...state, showDetails: !state.showDetails });
  };

  const sendMessage = (message) => {
    socket.emit("sendMessage", {
      room_id: roomId,
      User: { username },
      message,
    });
    setState({
      ...state,
      currentMessages: [
        ...state.currentMessages,
        { message, User: { username } },
      ],
    });
  };

  return (
    <div className="right d-flex flex-column">
      <RightNav room={props.room} changeDetails={changeDetails} />

      <div className="currentRoom d-flex">
        <div className="roomMain">
          <div className="messages">
            {state.currentMessages.map((message, i) => (
              <RoomMessage key={i} message={message} username={username} />
            ))}
          </div>
          <AddMessage sendMessage={sendMessage} />
        </div>
        {state.showDetails && <RoomDetails />}
      </div>
    </div>
  );
}
