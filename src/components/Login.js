import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import secrets from "../secrets";

// Context Stuff
import { SocketContext } from "../contexts/SocketContext";
import io from "socket.io-client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import messagingApp from "../pictures/messagingApp.png";

export default function Login() {
  const history = useHistory();
  const { setSocket } = useContext(SocketContext);

  const [user, setUser] = useState({ username: "user1", password: "password" });
  const [error, setError] = useState({ message: "" });

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError({ message: "" });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${secrets.backendURL}/users/login`, user)
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.user.username);
        setSocket(
          io.connect(secrets.backendURL, {
            query: { token: data.data.token },
          })
        );
        history.push("/rooms");
        console.log(data.data.token);
      })
      .catch((err) => {
        if (err.response.data.err) {
          setError(err.response.data.err);
          console.log(err);
        } else {
          console.log("node server might not be up?");
        }
      });
  };

  return (
    <Container className="mt-5">
      <Row className="">
        <Col xs={10} sm={6}>
          <h3 className="py-4">Be together, whenever.</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              {error.message && <div>{error.message}</div>}
              <Form.Control
                type="email"
                name="username"
                value={user.username}
                onChange={updateUser}
                placeholder="Username"
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={updateUser}
                placeholder="Password"
                className="rounded-pill"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Keep me signed in" />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="rounded-pill mb-3"
              onClick={login}
            >
              Sign In
            </Button>

            <Link className="p-3" to="/register">
              or Register
            </Link>
          </Form>
          <Link to='/' className="text-muted">Forgot your password?</Link>
        </Col>
        <Col xs={10} sm={6} className="d-flex justify-content-center">
          <img className="m-4" src={messagingApp} alt="messaging app" />
        </Col>
      </Row>
    </Container>
  );
}
