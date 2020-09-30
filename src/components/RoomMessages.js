import React, { useEffect, useRef } from "react";
import RoomMessage from "./RoomMessage";

export default function RoomMessages(props) {
  const el = useRef(null);
  const { messages, username } = props;

  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((message, i) => (
        <RoomMessage key={i} message={message} username={username} />
      ))}
      <div id="el" ref={el}></div>
    </div>
  );
}
