import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";
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
        {/* <Form inline>
          <FormControl type="text" placeholder="Search Users" className="mr-sm-2" />
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default myNavBar;
