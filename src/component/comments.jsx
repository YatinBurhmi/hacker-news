import React, { Component, Fragment } from "react";
// import { Button } from "react-bootstrap";
import fetchComments from "../api-functions/fetchLevelComments.js";
import getId from "../api-functions/getId.js";
import CreateCard from "./Contactcard";
import firebase from 'firebase'
import {Form} from 'react-bootstrap'
import Duration from '../api-functions/time'
import UserComments from './userComment.js'
import db from "../database/firebaseApp"
var localId = 0;
class Comments extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      commentObject: props.location.state,
      comments: [],
      commentText:'',
      userComment:[],
      isPopUp:false,
    };
    this.fetchComment = this.fetchComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addChildComment = this.addChildComment.bind(this);
  }

  async componentDidMount() {
    var id = this.state.commentObject.comment.id;
    const docRef = db.collection('comments');
    var doc = await docRef.get()
    doc.forEach(item => {
      console.log(item.id)
    })
    var allTheComments = doc.docs[0];
    var commentsData = allTheComments.data();
      if(commentsData.hasOwnProperty(id)){
    var userCommentInDatabase = [...commentsData[id]];
    this.setState({
        userComment:userCommentInDatabase
    })
   }
    var firstLevelComments = await fetchComments(
    this.state.commentObject.comment,
        0
      );
      
      if(firstLevelComments!== undefined){ 
      this.setState({
        comments: firstLevelComments
      });
     }
   }

  async fetchComment(obj, level) {
    var state = [...this.state.comments];
    var id = obj.id;
    var stateId = getId(state, id);
    var firstStates = state.slice(0, parseInt(stateId) + 1);
    var lastStates = state.slice(parseInt(stateId) + 1);
    var childComments = await fetchComments(obj, level);

    if (childComments !== undefined) {
      firstStates.push(...childComments);
      firstStates.push(...lastStates);
      this.setState({
        comments: firstStates
      });
    }
  }

  handleChange(ev){
    this.setState({
      commentText:ev.target.value
    });
    
  }

  async addComment(ev){

    ev.preventDefault();
    localId++;
    var id = this.state.commentObject.comment.id;
    
    const docRef = db.collection('comments')
    var doc = await docRef.get();
    var allTheComments = doc.docs[0];
    var commentsData = allTheComments.data();
    var newCommentText = this.state.commentText;
    var postedTime = parseInt((new Date().getTime() / 1000).toFixed(0));
    var newComment = {
        id:localId,
        by:firebase.auth().currentUser.displayName,
        time:postedTime,
        text:newCommentText,
        level:1          
      }
    var pastComments = [...this.state.userComment];
    pastComments.unshift(newComment);
    if(!commentsData.hasOwnProperty(id)){
    
    this.setState({
        userComment:pastComments,
        commentText:'', 
    })

    docRef.doc('allComments').set({
      [id]:pastComments
    },{merge: true})
    }

    else{
      var previousComments = [...commentsData[id]];
      previousComments.unshift(newComment);
      this.setState({
        userComment:previousComments,
        commentText:'', 
      })
    docRef.doc('allComments').set({
      [id]:previousComments
    },{merge: true})

    }
    }

    async addChildComment(id,commentText,level){
      localId=localId+1;
      var allTheComments = [...this.state.userComment];
      var index = getId(allTheComments,id);
      var commentTextToAdded = commentText;
      var newLevel = level+1;
      var newComment={
       id:localId,
       by:firebase.auth().currentUser.displayName,
       time:parseInt((new Date().getTime() / 1000).toFixed(0)),
       text:commentTextToAdded,
       level:newLevel   
      }
     
      var firstStates = allTheComments.slice(0, parseInt(index) + 1);
      var lastStates = allTheComments.slice(parseInt(index) + 1);
  
      firstStates.push(newComment);
      firstStates.push(...lastStates);
      this.setState({
        userComment:[...firstStates],
      })
      
      const docRef = db.collection('comments');
      var firestoreId = this.state.commentObject.comment.id; 
      docRef.doc('allComments').set({
      [firestoreId]:firstStates 
      },{merge:true})
  
     }  


  render() {
    
    const userComments = this.state.userComment.map(element => (
      <UserComments contact={element} function={this.addChildComment} />
    ))
    const firstLevelComment = this.state.comments.map(element => (
      <CreateCard key={element.id} contact={element} function={this.fetchComment} />
    ));
    return <Fragment>
    <Form>
    <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>add comment</Form.Label>
    <Form.Control value={this.state.commentText} as="textarea" rows="3"onChange={this.handleChange} />
    </Form.Group>
    <button onClick={this.addComment}>add</button>
  </Form>
    {userComments}
    {firstLevelComment}
   </Fragment>;
    
  }
}
export default Comments;
