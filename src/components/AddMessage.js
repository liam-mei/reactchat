import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function AddMessage(props) {
  const { sendMessage } = props;

  const [message, setMessage] = useState("");

  const editMessage = (e) => {
    setMessage(e.target.value);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     submitMessage();
  //   }
  // };

  const submitMessage = () => {
    if (message.length > 2) {
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
        // onKeyPress={handleKeyPress}
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
