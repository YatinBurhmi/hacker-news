import React, { Component, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";
import GoogleLogin from "../component/GoogleLogin";
import "../css/navbar.css"

class NavBar extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              src="https://news.ycombinator.com/y18.gif"
              alt="img not found"
            />
            <b style={{ color: "white" }}>HACKER NEWS</b>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link><Link style={{margin:"0", padding:"0"}} to="/show">Show</Link></Nav.Link>
            <Nav.Link><Link style={{margin:"0", padding:"0"}} to="/ask">Ask</Link></Nav.Link>
            <Nav.Link><Link style={{margin:"0", padding:"0"}} to="/job">Job</Link></Nav.Link>
          </Nav>
          <GoogleLogin isSignedIn={this.props.isSignedIn} />
        </Navbar>
      </Fragment>
    );
  }
}

export default NavBar;
