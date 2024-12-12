
import React from "react";
import {Navbar, Nav, Link, Button} from "react-bootstrap";

export function NaviBar() {
  return (
    <Nav defaultActiveKey="/home" as="ul" className="mb-3">
      <Nav.Item as="li">
        <Nav.Link href="/myflix">myFlix</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav.Item>
        <Button variant="primary" href="logout">Logout</Button>
    </Nav>
  );
}