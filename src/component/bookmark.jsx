import React, { Component } from 'react'
import fetchBookMarks from '../api-functions/fetchBookMarks'
import firebase from 'firebase';
import db from "../database/firebaseApp"

export class bookmark extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmark : []
        }

    }
componentDidMount(){
    firebase.auth().onAuthStateChanged(async user =>{
        var fetchAllPromises = fetchBookMarks(user.uid);
        var bookmark = await fetchAllPromises
        this.setState({
            bookmark: bookmark
        });
        console.log(bookmark)
    })
    }
    render() {
        return (
            <div>
                <h1>Bookmarks</h1>
            </div>
        )
    }
}

export default bookmark
