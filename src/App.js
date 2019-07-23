import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import Home from "./component/home";
import Show from "./component/show";
import Job from "./component/job";
import Ask from "./component/ask";
import Comments from "./component/comments";
import Bookmark from "./component/bookmark"
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig'

class App extends Component {
  state = {
    isSignedIn: false,
  }

 
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
    })
  }

 
  render() {
    return (
      <Fragment>
      <Router>
        <div className="container">
          <NavBar isSignedIn={this.state.isSignedIn}/>
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/show" component={Show} />
          <Route path="/ask" component={Ask} />
          <Route path="/job" component={Job} />
          <Route path="/comments" component={Comments}/>
          <Route path="/bookmark" component={Bookmark}></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
      </Fragment>
    );
  }
}
export default App;
