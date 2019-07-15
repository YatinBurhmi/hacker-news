import React, { Component } from "react";
import fetchLiveStories from "../api-functions/stories";
var number = 0;

export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveStories: []
    };
  }

  async componentDidMount() {
    var allThePromisies = fetchLiveStories(number);
    var liveStories = await allThePromisies;
    this.setState({
      liveStories: liveStories
    });
  }

  render() {
    return (
      <div>
        {Object.values(this.state.liveStories).map(story => (
          <ul>
            <li key={story.by}>
              {story.title}
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

export default home;
