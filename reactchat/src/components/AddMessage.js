import React, { useState } from "react";

export default function AddMessage(props) {
  const { sendMessage } = props;

  const [message, setMessage] = useState("fake message");

  const editMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={editMessage} value={message} />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  );
}
