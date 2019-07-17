import React,{Component} from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {Button} from "react-bootstrap"

firebase.initializeApp({
    apiKey:"AIzaSyDRjzf718MhaELWxYW_2etg7_zWFLA3tT4", 
    authDomain: "hackernews-website.firebaseapp.com" 
  })

class GoogleLogin extends Component {
    
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callBacks: {
          signInSuccess: () => false
        }
      }
    
    render() {
        return (
        <div>
            {this.props.isSignedIn ?
            <span style={{color:"white"}}>
                Hi{" "}{firebase.auth().currentUser.displayName}{" "}
                <Button variant="secondary" onClick = {()=> firebase.auth().signOut()}>Log Out</Button> 
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
