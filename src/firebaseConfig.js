import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBSrCUvI3ua4JnxTmXrwv1uPSZ38hYcuNw",
  authDomain: "hackernews-5ddf3.firebaseapp.com",
  databaseURL: "https://hackernews-5ddf3.firebaseio.com",
  projectId: "hackernews-5ddf3",
  storageBucket: "hackernews-5ddf3.appspot.com",
  messagingSenderId: "601662341985",
  appId: "1:601662341985:web:41ecd82f100ba023"
  };

 
    firebase.initializeApp(firebaseConfig);

     

   export default firebase