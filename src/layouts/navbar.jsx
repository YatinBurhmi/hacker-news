import React, { Component, Fragment } from "react";
import { Navbar, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import GoogleLogin from "../component/GoogleLogin";
import "../css/navbar.css";

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
            {" "}<b style={{ color: "white" }}>HACKER NEWS</b>
          </Navbar.Brand>
          <Nav className="mr-auto">
              <b style={{paddingLeft:10}}><Link style={{ margin: "0", padding: "0", textDecoration:"none" }} to="/">Home</Link></b>
              <b style={{paddingLeft:10}}><Link style={{ margin: "0", padding: "0", textDecoration:"none" }} to="/show">Show</Link></b>
              <b style={{paddingLeft:10}}><Link style={{ margin: "0", padding: "0", textDecoration:"none" }} to="/ask">Ask</Link></b>
              <b style={{paddingLeft:10}}><Link style={{ margin: "0", padding: "0", textDecoration:"none" }} to="/job">Job</Link></b>
              <b style={{paddingLeft:10}}><Link style={{ margin: "0", padding: "0", textDecoration:"none" }} to="/bookmark">Bookmark</Link></b>
          </Nav>
          <GoogleLogin isSignedIn={this.props.isSignedIn} />
        </Navbar>
      </Fragment>
    );
  }
}

export default NavBar;
