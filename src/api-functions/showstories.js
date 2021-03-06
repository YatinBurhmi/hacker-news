import calculateTimeDifferance from "./time";
import getSource from "./getSource";
async function fetchShowStories(count) {
  try {
    var response = await fetch(
      "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty"
    );
    var allTheStories = await response.json();

    const jsonData = allTheStories.slice(count, count + 30).map(element => {
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
      )
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
        });
    });
    count = count + 30;

    return Promise.all(jsonData);
    // var liveStories = await Promise.all(jsonData);
    // console.log(liveStories);
  } catch (err) {
    console.log(err);
  }
}

// fetchLiveStories(number);
export default fetchShowStories;
