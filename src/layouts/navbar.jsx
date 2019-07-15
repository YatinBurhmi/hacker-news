import React, { Component, Fragment } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">
            <img
              src="https://news.ycombinator.com/y18.gif"
              alt="img not found"
            />
            <b>HACKER NEWS</b>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="Ask">Ask</Nav.Link>
            <Nav.Link href="Job">Job</Nav.Link>
          </Nav>
          <Button variant="outline-primary">Login</Button>
        </Navbar>
      </Fragment>
    );
  }
}

export default NavBar;
