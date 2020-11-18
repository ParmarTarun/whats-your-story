import React from "react";
import Link from "next/link";
import { Navbar, Nav, Button } from "react-bootstrap";
const myNavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Link href="/" passHref>
        <Navbar.Brand>
          <img src="/logo.png" alt="logo" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/home" passHref>
            <Nav.Link >Home</Nav.Link>
          </Link>

          <Link href="/stories" passHref>
            <Nav.Link>Public Stories</Nav.Link>
          </Link>
        </Nav>

        <Link href="/auth/login" passHref>
          <Button className="header-btn sColor bt mr1">Sign In</Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button className="header-btn sColor">Sign Up</Button>
        </Link>
        <Link href="/" passHref>
          <Button
            className="header-btn sColor"
            onClick={() => localStorage.removeItem("token")}
          >
            Logout
          </Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default myNavBar;
