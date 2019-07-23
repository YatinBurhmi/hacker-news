import React, { Component } from 'react'
import fetchBookMarks from '../api-functions/fetchBookMarks'
import {Spinner, Button} from "react-bootstrap"
import firebase from 'firebase';
import db from "../database/firebaseApp"
import "../css/loadingIcon.css";

export class bookmark extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            bookmark : []
        }

    }
componentDidMount(){
    firebase.auth().onAuthStateChanged(async user =>{
        if(user){
            var fetchAllPromises = fetchBookMarks(user.uid);
        var bookmark = await fetchAllPromises
        this.setState({
            isLoaded:true,
            bookmark: bookmark
        });
        }
    })
    }

    
    removebookmark = (story)=>{
        console.log("Removing Item")
        if(firebase.auth().currentUser){
          let users = db.collection('users').doc(firebase.auth().currentUser.uid);
          users.get()
            .then((docsnapshot) => {
              if(docsnapshot.exists){  //if user exists then only update the upvotes array
                users.update({
                  "bookmark_id": firebase.firestore.FieldValue.arrayRemove(story.id)
                })
                this.componentDidMount()
              }
              else{ //set an empty updateArtilce array and update it afterwards
                users.set({
                  bookmark_id: []
                })
              }
            })
        }
        else{
          alert("Please Log in...")
        } 
      }
    

    render() {
        if(!this.state.isLoaded){
            return (
                <div className="loader">
                  <Spinner animation="grow" variant="secondary" />
                  <Spinner animation="grow" variant="success" />
                  <Spinner animation="grow" variant="danger" />
                  <Spinner animation="grow" variant="warning" />
                  <Spinner animation="grow" variant="info" />
                  <Spinner animation="grow" variant="light" />
                  <Spinner animation="grow" variant="dark" />
                </div>)
        }else{
        return (
            <div>
                <h1>Bookmarks of {firebase.auth().currentUser.displayName}</h1>
                <h6>{firebase.auth().currentUser.email}</h6>
                {this.state.bookmark.map(item=>{
                   return (
                   <div>
                   <h5>{item.title} <Button onClick={() => this.removebookmark(item)}>delete</Button></h5>
                   </div>
                   ) 
                })}
            </div>
        )
    }
}
}

export default bookmark
