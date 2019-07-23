import Duration from "./time.js";
// let level = 0;
function fetchAllComments(object, level) {
  if (!object.hasOwnProperty("kids")) {
    return undefined;
  }
  let array = [...object.kids];
  level++;
  var childComments = array.map(element =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
    )
      .then(response => response.json())
      .then(data => {
        return {
          object: data,
          by: data.by,
          text: data.text,
          time: data.time,
          level: level,
          id: data.id
        };
      })
  );
  return Promise.all(childComments);
}

export default fetchAllComments;
