import React, { Component, Fragment } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import {Link} from "react-router-dom"
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
            <b style={{ color: "white" }}>HACKER NEWS</b>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/ask">Ask</Link>
            <Link to="./job">Job</Link>
            <Link to="/show">Show</Link>
          </Nav>
          <Button variant="outline-primary">Login</Button>
        </Navbar>
      </Fragment>
    );
  }
}

export default NavBar;
