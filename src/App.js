import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Fragment>
    );
  }
}

export default App;
