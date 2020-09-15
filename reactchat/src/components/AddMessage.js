import React, { useState } from "react";
import Button from 'react-bootstrap/Button'

export default function AddMessage(props) {
  const { sendMessage } = props;

  const [message, setMessage] = useState("fake message");

  const editMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className='addMessage'>
      <input className='addMessageInput' type="text" onChange={editMessage} value={message} />
      <Button
              variant="primary"
              type="submit"
              className="addMessageButton"
              onClick={() => sendMessage(message)}
            >
              Send
            </Button>
    </div>
  );
}
