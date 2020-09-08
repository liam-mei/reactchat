import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import settingsIcon from "../pictures/settings.png";

export default function Navbar2() {
  const removeToken = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <div>I'm not sticky!</div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="navbar" to="/">
              Home
            </NavLink>
            <NavLink className="navbar" to="/login">
              Login
            </NavLink>
            <NavLink className="navbar" to="/register">
              Register
            </NavLink>
            <NavLink className="navbar" to="/rooms">
              Find Chat Room
            </NavLink>>
          </Nav>
          <div>I'm sticky!!!</div>
        </Navbar.Collapse> */}
        <NavDropdown title={<img className='icon' src={settingsIcon}/>} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.2">About</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Terms</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Privacy Policy</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Cookie Policy</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4" onClick={removeToken}>
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
        {/* <NavLink className="navbar" onClick={removeToken} to="/">
          Log Out
        </NavLink> */}
      </Navbar>
    </>
  );
}
