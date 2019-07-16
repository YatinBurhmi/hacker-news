import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
import "./App.css";
import Welcome from "./component/welcom";
import Guideline from "./component/guideline";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Home   from "./component/home"
import firebase from 'firebase';

class App extends Component {
  state = {isSignedIn: false}

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
    })
  }

  render() {
    return (
      <div className="container">
        <NavBar isSignedIn={this.state.isSignedIn}/>
        {/* <Home/> */}
        <Guideline/>
        <Footer />
      </div>
    );
  }
}

export default App;
