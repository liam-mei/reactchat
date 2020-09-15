import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function AddMessage(props) {
  const { sendMessage } = props;

  const [message, setMessage] = useState("fake message");

  const editMessage = (e) => {
    setMessage(e.target.value);
  };

  const submitMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="addMessage">
      <textarea
        className="addMessageInput"
        type="text"
        onChange={editMessage}
        value={message}
      />
      <Button
        variant="primary"
        type="submit"
        className="addMessageButton"
        onClick={submitMessage}
      >
        Send
      </Button>
    </div>
  );
}
