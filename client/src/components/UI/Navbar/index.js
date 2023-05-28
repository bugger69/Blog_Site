import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import ErrorHandler from "../../ErrorHandler";

const SiteNavbar = () => {
  const token = localStorage.getItem("token");
  // const [keyword, setKeyWord] = useState("");

  // const Search = () => {}

  const Logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      alert("logged out!");
      window.location.href = "/";
    } catch (e) {
      console.log(e);
      return <ErrorHandler />;
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mx-2 mb-2">
      <Navbar.Brand className="ml-2" href="/">
        BlogSite
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto d-flex">
          <Nav.Link href="/blogs">All Blogs</Nav.Link>
          <Nav.Link href="/blogs/new">Write a Blog</Nav.Link>
          
        </Nav>
        {/* <Form className="d-flex">
          <Form.Control
            value={keyword}
            onChange={Search}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" onClick={Search}>Search</Button>
        </Form> */}
      </Navbar.Collapse>
      <NavDropdown title="User" id="basic-nav-dropdown" className="mx-2">
            {!token ? (
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {!token ? (
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {!token ? (
              <React.Fragment></React.Fragment>
            ) : (
              <NavDropdown.Item href="/user">User Info</NavDropdown.Item>
            )}
            {!token ? (
              <React.Fragment></React.Fragment>
            ) : (
              <NavDropdown.Item href="/user/dashboard">Dashboard</NavDropdown.Item>
            )}
            {!token ? (
              <React.Fragment></React.Fragment>
            ) : (
              <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
            )}
          </NavDropdown>
    </Navbar>
  );
};

export default SiteNavbar;
