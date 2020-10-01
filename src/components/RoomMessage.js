import React from "react";

export default function RoomMessage(props) {

  const { message, username } = props;
  const { user } = message;

  // console.log({props})

  return (
    <div
      className={`${
        username === user.username ? "messageRight" : "messageLeft"
      }`}
    >
      {message.message}
    </div>
  );
}
