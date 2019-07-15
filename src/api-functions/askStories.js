import calculateTimeDifferance from './time';
async function fetchLiveAskStories(count){
try{
var response = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=prett');
var allTheStories = await response.json();


const jsonData = allTheStories.slice(count,count+30).map( (element)=>{
   return  fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`).
   then(response => response.json()).then(data=>{
    return {
         'by':data.by, 
         'score':data.score,
         'time' : calculateTimeDifferance(data.time),
         'title': data.title,
         'comments':data.descendants 
       } 
     }) ;
})
count = count+30;

return Promise.all(jsonData);

}
catch(err){
  console.log(err); 
} 
}


export default fetchLiveAskStories
