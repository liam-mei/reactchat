import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Navbar2() {
  return (
    <>
      <div>
        I'm not sticky!
      </div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="navbar" to="/">Home</NavLink>
            <NavLink className="navbar" to="/login">Login</NavLink>
            <NavLink className="navbar" to="/register">Register</NavLink>
            <NavLink className="navbar" to="/rooms">Find Chat Room</NavLink>
          </Nav>
          <div>I'm sticky!!!</div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
