import React, { Component, Fragment } from "react";
import fetchJobStories from "../api-functions/jobsStories";
var number = 0;

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobFeeds: []
    };
  }

  async componentDidMount() {
    var allThePromisies = fetchJobStories(number);
    var jobFeeds = await allThePromisies;
    this.setState({
      jobFeeds: jobFeeds
    });
  }
  render() {
    return (
      <Fragment>
        {Object.values(this.state.jobFeeds).map(story => (
          <div className="media position-relative" style={{height:"4rem"}}>
            <br/>
            <br/>
            <img
              className="mr-2"
              style={{ height: "40px", width: "40px"}}
              src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
              alt="not found"
            />
            <div className="media-body">
              <h6 className="mt-0">{story.title}</h6>
              <b>{story.time}</b>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default Job;
