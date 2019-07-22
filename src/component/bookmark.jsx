import React, { Component } from 'react'
import fetchBookMarks from '../api-functions/fetchBookMarks'
import {Spinner} from "react-bootstrap"
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
        // else{
        //     alert("Please Log In")
        // }
    })
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
                <h1>Bookmarks</h1>
                {this.state.bookmark.map(item=>{
                   return <h5>{item.title}</h5>  
                })}
            </div>
        )
    }
}
}

export default bookmark
