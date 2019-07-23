import React,{Component} from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Button} from "react-bootstrap"
import db from "../database/firebaseApp"

class GoogleLogin extends Component {
    
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callBacks: {
          signInSuccess: () => false
        }
      }
    
    render() {

    firebase.auth().onAuthStateChanged(user =>{
        if(user){
          db.collection('users').doc(user.uid).set({
            UID: user.uid,
            username: user.displayName,
            email: user.email
          },{merge:true})
        }  else{
          return
        }
      })
        return (
        <div>
            {this.props.isSignedIn ?
            <span style={{color:"white"}}>
                Hi{" "}{firebase.auth().currentUser.displayName}{" "}
                <Button variant="secondary" onClick = {()=>{
                    firebase.auth().signOut()
                    window.location="https://hackernewstestyb.herokuapp.com//"
                } } >Log Out</Button> 
            </span>  
            :
            <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
            />
          }
      </div>
        )
    }
}

export default GoogleLogin
