import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.location.state
    };
  }
  render() {
      console.log(this.state.comment)
    return (
      <Fragment>
        <h1>Comments</h1>
      </Fragment>
    );
  }
}
export default Comments;
