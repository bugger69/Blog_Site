import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";

import SiteNavbar from "../UI/Navbar";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        alert("User registered!!");
        console.log(res);
        window.location.href = "/login";
      })
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      <SiteNavbar />
      <Container style={{display: 'flex', justifyContent: "center"}}>
        <Card style={{ width: "40%" }} className="card_helper">
          <Container className="mb-2">
            <h3 className="mb-2">Register</h3>
            <Form onSubmit={registerUser}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="UserName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              {/* <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {/* <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
              <Button type="submit">Register</Button>
            </Form>
          </Container>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Register;
