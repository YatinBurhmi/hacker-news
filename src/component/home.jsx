import React, { Component } from "react";
import fetchLiveStories from "../api-functions/stories";
import { Card, Button, Media, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import db from "../database/firebaseApp"
import BookMark from './bookmark'
var number = 0;

export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveStories: [],
      numberOfStories:0
    };
    this.updateStories = this.updateStories.bind(this);
  }

  async componentDidMount() {
    var allThePromisies = fetchLiveStories(number);
    var liveStories = await allThePromisies;
    this.setState({
      liveStories: liveStories
    });
    this.storiesToDatabase(liveStories)
  }

  async storiesToDatabase(liveStories){
    liveStories.map(story => {
      db.collection('stories').doc(story.id.toString()).set({
        id:story.id,
        title: story.title,
        score: story.score,
        isUpvoted: false  
      },{merge:true})
    })
  }


  async upvote(story){
    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
    if(userId === null){
      alert("Please Log in to Upvote")
    }else{
      this.initializeUpvotedArticles()
      let data = await this.getStoryPoints(story.id.toString())
      let isItemPresent = await this.checkUpvotedItem(story.id) 
      // console.log(isItemPresent)
      if(isItemPresent){
        this.removeUpvotedArticles(story)
        this.decrementUpvote(story.id.toString(), data.score)
      }else{
        this.addUpvotedArticles(story)
        this.incrementUpvote(story.id.toString(), data.score)
      }
    }
  }

  incrementUpvote(id,points){
    db.collection('stories').doc(id).update({
      score:points+1
    })
  }
  decrementUpvote(id,points){
    db.collection('stories').doc(id).update({
      score:points-1
    })
  }
  async getStoryPoints(id){
    let getDoc = await db.collection('stories').doc(id).get()
    return getDoc.data()
  }

  //to check if item is upvoted by a user
  async checkUpvotedItem(id){
    let getDoc = await db.collection('users').doc(firebase.auth().currentUser.uid).get()
    // console.log(getDoc.data().upvotedArticles.includes(id))
    return getDoc.data().upvotedArticles.includes(id)
  }

  async initializeUpvotedArticles(){
    if(firebase.auth().currentUser){
      let users = await db.collection('users').doc(firebase.auth().currentUser.uid).get()
      if(users.data().upvotedArticles === undefined){
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
          upvotedArticles : []
        })
      }
    }
  }
  addUpvotedArticles = (story)=>{
    console.log("Adding Item")
    if(firebase.auth().currentUser){
      let users = db.collection('users').doc(firebase.auth().currentUser.uid);
      users.get()
        .then((docsnapshot) => {
          if(docsnapshot.exists){  //if user exists then only update the bookmarks array
            users.update({
              "upvotedArticles": firebase.firestore.FieldValue.arrayUnion(story.id)
            })
          }
          else{ //set an empty bookmarks array and update it afterwards
            users.set({
              upvotedArticles:[]
            })
          }
        })
    }
    else{
      alert("Please Log in...")
    } 
  }

  removeUpvotedArticles = (story)=>{
    console.log("Removing Item")
    if(firebase.auth().currentUser){
      let users = db.collection('users').doc(firebase.auth().currentUser.uid);
      users.get()
        .then((docsnapshot) => {
          if(docsnapshot.exists){  //if user exists then only update the upvotes array
            users.update({
              "upvotedArticles": firebase.firestore.FieldValue.arrayRemove(story.id)
            })
          }
          else{ //set an empty updateArtilce array and update it afterwards
            users.set({
              upvotedArticles:[]
            })
          }
        })
    }
    else{
      alert("Please Log in...")
    } 
  }



  addBookMark = (story)=>{
    console.log("Bookmark Pressed")
    if(firebase.auth().currentUser){
      let users = db.collection('users').doc(firebase.auth().currentUser.uid);
      users.get()
        .then((docsnapshot) => {
          if(docsnapshot.exists){  //if user exists then only update the bookmarks array
            users.update({
              "bookmark_id": firebase.firestore.FieldValue.arrayUnion(story.id)
            })
          }
          else{ //set an empty bookmarks array and update it afterwards
            users.set({
              bookmark_id:[]
            })
          }
        })
    }
    else{
      alert("Please Log in...")
    } 
  }

  async updateStories(){
    var number = this.state.numberOfStories;
    number = number+30;
    var allThePromisies = fetchLiveStories(number);
    var liveStories = await allThePromisies;
    this.setState({
       liveStories: liveStories,
       numberOfStories: number
     });
    this.storiesToDatabase(liveStories)
    } 
   defaultSrc = event =>{
        event.target.src="https://gitlab.com/favicon.ico"
   }

  render() {
    return (
      <div>
        {this.state.liveStories.map(story => (
          <Card
            key={story.id}
            style={{ width: "inherit", height: "7rem", padding: 20, backgroundColor:"#fdf5e2" }}
          >
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={`http://${story.source}/favicon.ico`}
                alt=""
                onError={this.defaultSrc}
              />
              <Media.Body>
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
                <span style={{fontSize:"small"}}>
                  <b>{story.score}-Points</b>{" "}<b style={{paddingLeft:10}}>{story.time}</b>
                </span>
                <span>
                  <Link
                    style={{ marginLeft: -320, color: "orange" }}
                    to={{
                      pathname: "/comments",
                     state: { comment:story.object }
                    }}
                  >
                    {story.comments}-Comments
                  </Link>
                </span>
                <span>
                  <a
                    href={`http://www.twitter.com/share?url=${story.url}`}
                    target="blank"
                  >
                    <Badge style={{ marginLeft: -330 }} variant="info">
                      Tweet
                    </Badge>
                  </a>
                  <Button onClick={() => this.addBookMark(story)}>BookMark</Button>
                  <Button onClick={() => this.upvote(story)}>Upvote</Button>
                </span>
              </Media.Body>
            </Media>
          </Card>
        ))}
        <Button onClick={this.updateStories} variant="danger" style={{ width: 1110 }}>
          + MORE NEWS
        </Button>
      </div>
    );
  }
}

export default home;
