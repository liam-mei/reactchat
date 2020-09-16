import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import D from "../pictures/favicon.ico";

export default function HomeNav() {
  return (
    <>
      <div className="bg-light">Join the Family!!!</div>
      <Navbar className='px-lg-5' bg="light" variant="light" sticky="top">
        <Navbar.Brand className="mr-auto">
          <img alt="logo" className="logo" src={D} />
        </Navbar.Brand>
        <Nav>
          <Link className="p-2" to="/rooms">
            Rooms
          </Link>
          <Link className="p-2" to="/features">
            Features
          </Link>
          <Link className="p-2" to="/privacy">
            Privacy
          </Link>
          <Link className="p-2" to="/developers">
            For Developers
          </Link>
        </Nav>
      </Navbar>
    </>
  );
}
