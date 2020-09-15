import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./App.css";

import getToken from "./utils/getToken";

import { SocketContext } from "./contexts/SocketContext";
import io from "socket.io-client";

function App() {
  const history = useHistory();
  const token = getToken();
  const [socket, setSocket] = useState({
    emit: () => {},
    on: () => {},
    off: () => {},
  });

  useEffect(() => {
    if (token) {
      const newSocket = io.connect("http://localhost:5000");
      setSocket(newSocket);
      history.push('/rooms')
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <div className="app">
        <AppRouter />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
