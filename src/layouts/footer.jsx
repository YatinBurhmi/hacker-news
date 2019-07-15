import React, { Component, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/footer.css";

class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ backgroundColor: "#343a40" }}>
          <a href="http://www.startupschool.org">
            Registration is open for Startup School 2019. Classes start July
            22nd.
          </a>
          <br />
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Link href="#">Guidelines</Nav.Link>
            <Nav.Link href="#">FAQ</Nav.Link>
            <Nav.Link href="#">Support</Nav.Link>
            <Nav.Link href="#"> Api</Nav.Link>
            <Nav.Link href="#">Sequrity</Nav.Link>
            <Nav.Link href="#">Lists</Nav.Link>
            <Nav.Link href="#">Bookmarklet</Nav.Link>
            <Nav.Link href="#">Legal</Nav.Link>
            <Nav.Link href="#">Apply to YC</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </div>
      </Fragment>
    );
  }
}

export default Footer;
