// import firebase from 'firebase';
import db from "../database/firebaseApp"
import calculateTimeDifferance from "./time";
import getSource from './getSource';

async function fetchBookMarks(id){
        try{    
            let userData = {}
            let users = db.collection('users');
            let getDoc = await users.get()
            userData = getDoc.docs.filter(item => item.data().UID === id)
            let arr = []
            arr = userData[0].data().bookmark_id
            const bookmarks = arr.map(item =>{
                return (fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`)
                .then(response => response.json())
                .then(data => {
                    return {
                        id: data.id,
                        by: data.by,
                        score: data.score,
                        time: calculateTimeDifferance(data.time),
                        url: data.url,
                        source: getSource(data.url),
                        title: data.title,
                        comments: data.descendants
                      };
                }))
            })
            return Promise.all(bookmarks);
        } catch(err){
            console.log(err)
        }  
        }

export default fetchBookMarks;