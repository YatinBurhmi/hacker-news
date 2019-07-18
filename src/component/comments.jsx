import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import fetchComments  from '../api-functions/fetchLevelComments.js'
import getId from '../api-functions/getId.js'
import CreateCard from './Contactcard'


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
       commentObject: props.location.state,
      comments:[]
    };
    this.fetchComment = this.fetchComment.bind(this);
  }
 
   async componentDidMount(){
   var firstLevelComments = await fetchComments(this.state.commentObject.comment,0);
   console.log(firstLevelComments);
   this.setState({
     comments:firstLevelComments
   })


  }

  async  fetchComment(obj,level){
  var state = [...this.state.comments];
  var id = obj.id;
  var stateId = getId(state,id);
  var firstStates = state.slice(0,parseInt(stateId)+1);
  var lastStates = state.slice(parseInt(stateId)+1);
  var childComments = await  fetchComments(obj,level);
  console.log(childComments);
  if(childComments!==undefined){
   firstStates.push(...childComments);
   firstStates.push(...lastStates);
   this.setState({
     comments:firstStates
   })
  }

  }


  render() {
      const firstLevelComment =  this.state.comments.map(element => 
       <CreateCard contact = {element} function={this.fetchComment} />
      )                  
      console.log(this.state.commentObject.comment)
    return (
      <Fragment>
        {firstLevelComment}
      </Fragment>
    );
  }
}
export default Comments;
