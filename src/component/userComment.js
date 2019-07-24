
import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import Duration from '../api-functions/time'
import {Form} from 'react-bootstrap'
// import firebase from 'firebase'
// import getId from "../api-functions/getId.js";

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
  var commentText = this.props.contact.text;
  return (
    <Fragment>
      <div
        className="media mb-3"
        style={{ position: "relative", left: indentForCard, width: 1000 }}
      >
        <div className="media-body p-2 shadow-sm rounded bg-light border">
          <small className="float-right text-muted">{Duration(this.props.contact.time)}</small>
          <h6 className="mt-0 mb-1">
            <img
              className="mr-3 bg-light rounded"
              width="48"
              height="48"
              src={`https://api.adorable.io/avatars/48/${
                this.props.contact.by
              }@adorable.io.png`}
              alt={this.props.contact.by}
            />
            {this.props.contact.by}
          </h6>
          <p
            dangerouslySetInnerHTML={{ __html: commentText }}
            style={{ fontSize: "small" }}
          />
          <Button
            variant="info"
            size="sm"
            onClick={this.changeTheState}
          >
            add comment
          </Button>
        
          
            <Form style={{display:this.state.isPopUp?'block':'none'}}>
    <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Control value={this.state.text} as="textarea" rows="3"onChange={this.handleChange} />
    </Form.Group>
    <button onClick={this.addChildComment}>add</button>
  </Form>
       </div>
      </div>
     </Fragment>
)
  }
 
}

export default userComments

