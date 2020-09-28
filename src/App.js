import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppRouter from "./components/AppRouter";
// import secrets from "./secrets";
import "./App.css";

import getToken from "./utils/getToken";
import socketCreator from "./socket/socketCreator";

import { SocketContext } from "./contexts/SocketContext";

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
      setSocket(socketCreator(token, history));
    }
  }, [token, history]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <div className="app">
        <AppRouter />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
