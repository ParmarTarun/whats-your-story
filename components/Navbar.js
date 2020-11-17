import React from "react";
import Link from "next/link";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
const myNavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand>
          <img src="logo.png" alt="logo" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Link href="/home" passHref>
            <Nav.Link>Home</Nav.Link>
          </Link> */}
          <Link href="/stories" passHref>
            <Nav.Link>Public Stories</Nav.Link>
          </Link>
        </Nav>
        <Form inline>
          {/* <FormControl type="text" placeholder="Search" className="mr1" /> */}
          <Link href="/auth/login" passHref>
            <Button className="header-btn sColor bt mr1">Sign In</Button>
          </Link>
          <Link href="/auth/register" passHref>
            <Button className="header-btn sColor">Sign Up</Button>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default myNavBar;
