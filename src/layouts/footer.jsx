import React, { Component, Fragment } from "react";
import { Nav } from "react-bootstrap";
import "../css/footer.css";

class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ backgroundColor: "#343a40" }}>
          <br />
          <a href="http://www.startupschool.org">
            Registration is open for Startup School 2019. Classes start July
            22nd.
          </a>
          <br />
          <Nav className="justify-content-center">
            <Nav.Link href="#">GuideLines</Nav.Link>
            <Nav.Link href="http://newsfaq.html">FAQ</Nav.Link>
            <Nav.Link href="mailto:hn@ycombinator.com">Support</Nav.Link>
            <Nav.Link href="https://github.com/HackerNews/API"> Api</Nav.Link>
            <Nav.Link>Security</Nav.Link>
            <Nav.Link>Lists</Nav.Link>
            <Nav.Link> Bookmarklet</Nav.Link>
            <Nav.Link href="http://www.ycombinator.com/legal/">Legal</Nav.Link>
            <Nav.Link href="http://www.ycombinator.com/apply">Apply to YC</Nav.Link>
            <Nav.Link href="mailto:hn@ycombinator.com">Contact</Nav.Link>
          </Nav>
          <br />
        </div>
      </Fragment>
    );
  }
}

export default Footer;
