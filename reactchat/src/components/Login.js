import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

export default function Login() {
  const history = useHistory();

  const [user, setUser] = useState({ username: "user1", password: "password" });

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", user)
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("token", data.data.token);
        history.push("/rooms");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className='red'>
      <Row className='blue'>
        <Form>
          <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              name="username"
              value={user.username}
              onChange={updateUser}
              placeholder="Username"
            />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={updateUser}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={login}>
            Sign In
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
