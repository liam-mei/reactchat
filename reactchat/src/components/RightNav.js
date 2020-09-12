import React from "react";
import { useHistory } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import settingsIcon from "../pictures/settings.png";
import darkFavicon from "../pictures/faviconDark.ico";

export default function RightNav(props) {
  const history = useHistory();
  const removeToken = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
    <i class="fas fa-info-circle"></i>
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="d-flex justify-content-start"
      >
        <Navbar.Brand className="d-flex mr-auto">
          {/* <img className="logo" src={darkFavicon} />
          <div className="m-2 pl-3">{props.room.name}</div> */}
          {props.room.name}
        </Navbar.Brand>
        <NavDropdown
          title={<img className="icon" src={settingsIcon} />}
          id="basic-nav-dropdown"
          className=""
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
