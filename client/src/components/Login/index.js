import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";

import ErrorHandler from "../ErrorHandler";
import SiteNavbar from "../UI/Navbar";
import "./index.module.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("tokenExpiration");
      alert("logged out!");
      window.location.href = "/";
    } catch (e) {
      console.log(e);
      return <ErrorHandler />;
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    axios
      .post(
        "http://localhost:5000/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token, 7200);
          localStorage.setItem("username", res.data.username, 7200);
          
          const EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
          const expirationDate = new Date(
            Date.now() + EXPIRATION_TIME
          ).toISOString();
          localStorage.setItem("tokenExpiration", expirationDate);

          const tokenExpiration = localStorage.getItem("tokenExpiration");
          const expirationTime =
          new Date(tokenExpiration).getTime() - Date.now();
          let logoutTimer = setTimeout(Logout, expirationTime);

          const resetLogoutTimer = () => {
            clearTimeout(logoutTimer);
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            const expirationTime = new Date(tokenExpiration).getTime() - Date.now();
            const newLogoutTimer = setTimeout(Logout, expirationTime);
            logoutTimer = newLogoutTimer;
          }
          
          document.addEventListener('click', resetLogoutTimer);
          document.addEventListener('keydown', resetLogoutTimer);
          document.addEventListener('scroll', resetLogoutTimer);
          
          alert("Logged in!!!");
          window.location.href = "/";
        }
      })
      .catch((e) => {
        alert("check username and password");
      });
  };
  return (
    <React.Fragment>
      <SiteNavbar />
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "40%" }} className="card_helper">
          <Container className="mb-2">
            <h3 className="mb-2">Login</h3>
            <Form onSubmit={onLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit">Login</Button>
            </Form>
          </Container>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Login;
