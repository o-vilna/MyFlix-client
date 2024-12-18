import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NaviBar = ({ user, setUser, setToken }) => {
  
  return (
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark"  className="fixed-top">
      <Container fluid className="p-0">
      <Navbar.Brand as={Link} to="/">
        myFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {user && (
            <>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
        {user ? (
  <Button
    variant="link"
    className="text-light ms-2"
    onClick={() => {
      setUser(null);
      setToken(null);
      localStorage.clear();
    }}
  >
    Logout
  </Button>
) : (
  <Nav.Link as={Link} to="/login">
    Login
  </Nav.Link>
)}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NaviBar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};
