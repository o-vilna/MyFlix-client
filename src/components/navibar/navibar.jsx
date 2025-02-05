import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Container,Form, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";

export const NaviBar = ({ user, onLoggedOut, onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="lg"
      variant="dark"
      className="fixed-top"
    >
      <Container fluid className="p-0">
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search movies..."
                className="me-2"
                aria-label="Search"
                onChange={handleInputChange}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NaviBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
export default NaviBar;