import React from "react";
import { useHistory } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import darkFavicon from "../pictures/faviconDark.ico";

export default function LeftNav(props) {
  const { socket } = props;
  const history = useHistory();
  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/");
    socket.emit("logOff");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand className="d-flex mr-auto">
          <img alt='logo' className="logo d-none d-md-block" src={darkFavicon} />
          <div className="m-2 pl-3 d-none d-lg-block">Chats</div>
        </Navbar.Brand>
        <NavDropdown
          title={<i className="fas fa-cog fa-2x"></i>}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item>Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>About</NavDropdown.Item>
          <NavDropdown.Item>Terms</NavDropdown.Item>
          <NavDropdown.Item>Privacy Policy</NavDropdown.Item>
          <NavDropdown.Item>Cookie Policy</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={removeToken}>Log Out</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </>
  );
}
