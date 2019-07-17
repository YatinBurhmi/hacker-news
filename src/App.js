import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
// import Welcome from "./component/welcom";
// import Guideline from "./component/guideline";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Home from "./component/home";
import Show from "./component/show";
import Job from "./component/job";
import Ask from "./component/ask";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/show" component={Show} />
          <Route path="/ask" component={Ask} />
          <Route path="/job" component={Job} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
