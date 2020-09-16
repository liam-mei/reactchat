import React from "react";

export default function RoomMessage(props) {

  const { message, username } = props;
  const { User } = message;

  return (
    <div
      className={`${
        username === User.username ? "messageRight" : "messageLeft"
      }`}
    >
      {message.message}
    </div>
  );
}
