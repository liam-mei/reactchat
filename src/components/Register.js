import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import HomeNav from "./HomeNav";
import secrets from "../secrets";

export default function Register() {
  const history = useHistory();

  const [user, setUser] = useState({ username: "user1", password: "password" });
  const [error, setError] = useState({ error: "" });

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError({ userExists: false });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post(`${secrets.backendURL}/users/register`, user)
      .then((data) => {
        window.localStorage.setItem("token", data.data.token);
        history.push("/rooms");
        console.log(data);
      })
      .catch((err) => {
        setError(err.response.data.err);
      });
  };

  return (
    <div>
      <HomeNav />
      <Container className="register">
        <Row className="">
          <Col xs={12} sm={6}>
            <h3 className="py-4">Simple. Reliable. Secure.</h3>
            <Form>
              <Form.Group controlId="formBasicEmail">
                {error.error ? <div>{error.error}</div> : null}
                <Form.Label>Username</Form.Label>
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={updateUser}
                  placeholder="Password"
                  className="rounded-pill"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={register}
                className="rounded-pill"
              >
                Register
              </Button>
              <a className="p-3" onClick={() => history.push("/login")}>
                or Sign In
              </a>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
