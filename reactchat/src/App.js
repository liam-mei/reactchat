import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import "./App.css";

import socket from "./socket/socketConnection";

function App() {
  return (
    <div className='app'>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
