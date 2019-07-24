import React, { Component } from 'react'
import fetchBookMarks from '../api-functions/fetchBookMarks'
import {Spinner,Button, Card, CardGroup } from "react-bootstrap"
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
                {this.state.bookmark.map(story=>{
                   return (
                    
                   <div>
                
                <CardGroup>
  <Card style={{backgroundColor:"#fdf5e2"}} text="black" >
    <Card.Body>
      <Card.Text>
       <a href={story.url} target="blank">
                    <b
                      style={{
                        marginLeft: -347,
                        color: "black",
                        fontSize: "large"
                      }}
                    >
                      {story.title}
                    </b>
                  </a>
                  <span>-({story.source})</span>
                  <br />
                  <span>By - {story.by}</span>
                  <br />
                  <span style={{ fontSize: "small" }}>
                    <b>{story.score}-Points</b>{" "}
                    <b style={{ paddingLeft: 10 }}>{story.time}</b>
                  </span>
                  <a
                    href={`http://www.twitter.com/share?url=${story.url}`}
                    target="blank"
                    style={{margin:"0", padding:"0"}}
                  >
                    <i className="fa fa-twitter" style={{ marginLeft:15,fontSize:30,color:"#54acee"}}></i>
                  </a>
   <Button variant="info" style={{float:"right"}} onClick={() => this.removebookmark(story)}><i className="fa fa-trash-o"></i></Button>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{story.time}</small>
    </Card.Footer>
  </Card>
  </CardGroup>
     <br/>
  </div>) 
                })}
            </div>
        )
    }
}
}

export default bookmark
