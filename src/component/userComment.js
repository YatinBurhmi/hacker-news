
import React, { Component, Fragment } from "react";
import { Button, Card } from "react-bootstrap";
import Duration from '../api-functions/time'
import {Form} from 'react-bootstrap'
import firebase from 'firebase'
import getId from "../api-functions/getId.js";

class userComments extends Component{
  constructor(props){
      super(props);
      this.state={
          isPopUp:false,
          level:this.props.contact.level,
          text:'',
          id:this.props.contact.id
      }
    this.changeTheState = this.changeTheState.bind(this);
    this.addChildComment = this.addChildComment.bind(this) ; 
    this.handleChange = this.handleChange.bind(this);
  }

  changeTheState(){
   var status = this.state.isPopUp;
   this.setState({
       isPopUp:!status
   })


  }

  handleChange(ev){
      this.setState({
          text:ev.target.value,
      })
   
  }

  addChildComment(ev){
    ev.preventDefault();
    var commentText = this.state.text;
    var level = this.props.contact.level;
    var id = this.props.contact.id;
    this.props.function(id,commentText,level);
    this.setState({
        isPopUp:false
    })
   
    
  }
  
  
  
  render(){
   
  var level = this.props.contact.level;
  var indent = level * 50;
  var indentForCard = `${indent}px`;
  return (
    <Fragment>
      <p />
      <Card style={{backgroundColor:"#dadddf"}}>
        <div style={{ position: "relative", left: indentForCard, width: 900 }}>
          <img
            src={require("../images/images.png")}
            style={{ height: 40, width: 40, borderRadius: 50 }}
            alt=""
          />{" "}
          <b
            style={{
              fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
              color: "#b92c27"
            }}
          >
            {this.props.contact.by}
          </b>
          <br />
          <span style={{ fontSize: "x-small" }}>{Duration(this.props.contact.time)}</span>
          <br />
          <b style={{ fontSize: "small" }}>{this.props.contact.text}</b>
          <br />
          <Button
            variant="Light"
            style={{ outlineColor: "none" }}
            onClick={this.changeTheState}
          >
            Add comment
          </Button>
          
            <Form style={{display:this.state.isPopUp?'block':'none'}}>
    <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Control value={this.state.text} as="textarea" rows="3"onChange={this.handleChange} />
    </Form.Group>
    <button onClick={this.addChildComment}>add</button>
  </Form>
        </div>
      </Card>
    </Fragment>
)
  }
 
}

export default userComments

