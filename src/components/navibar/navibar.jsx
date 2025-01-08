import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

export const NaviBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="lg"
      variant="dark"
      className="fixed-top"
    >
      <Container fluid className="p-0">
        <Navbar.Brand>myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={() => alert("Login clicked")}
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={() => alert("Signup clicked")}
                  >
                    Signup
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={() => alert("Home clicked")}
                  >
                    Home
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={() => alert("Profile clicked")}
                  >
                    Profile
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={onLoggedOut}
                  >
                    Logout
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NaviBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired,
};
