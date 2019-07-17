import React, { Component } from "react";
import { Card } from "react-bootstrap";
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
      <div>
        {Object.values(this.state.jobFeeds).map(story => (
          <Card key={story.id} style={{ width: "inherit", height: "5rem" }}>
            <Card.Body>
              <Card.Title>{story.title}</Card.Title>
              <Card.Text>{story.time}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Job;
