import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ErrorHandler from "../../ErrorHandler";

const SiteNavbar = () => {
  const token = localStorage.getItem("token");
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
    <Navbar bg="light" expand="lg" className="mb-2">
      <Container>
        <Navbar.Brand href="/">BlogSite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex">
            <Nav.Link href="/blogs">All Blogs</Nav.Link>
            <Nav.Link href="/blogs/new">Write a Blog</Nav.Link>
            <NavDropdown
              title="User"
              id="basic-nav-dropdown"
              className="d-inline-block float-right"
            >
              {!token?<NavDropdown.Item href="/login">Login</NavDropdown.Item>:<React.Fragment></React.Fragment>}
              {!token?<NavDropdown.Item href="/register">Register</NavDropdown.Item>:<React.Fragment></React.Fragment>}
              {!token?<React.Fragment></React.Fragment>:<NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
