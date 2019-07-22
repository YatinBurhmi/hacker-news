import React, { Component } from "react";
import { Button, Card, Media, Badge, Spinner } from "react-bootstrap";
import fetchJobStories from "../api-functions/jobsStories";
import "../css/loadingIcon.css";
var number = 0;

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      jobFeeds: [],
      numberOfStories: 0
    };
    this.updateJobs = this.updateJobs.bind(this);
  }

  async componentDidMount() {
    var allThePromisies = fetchJobStories(number);
    var jobFeeds = await allThePromisies;
    this.setState({
      isLoaded: true,
      jobFeeds: jobFeeds
    });
  }

  async updateJobs() {
    var number = this.state.numberOfStories;
    number = number + 30;
    var allThePromisies = fetchJobStories(number);
    var jobFeeds = await allThePromisies;
    this.setState({
      jobFeeds: jobFeeds,
      numberOfStories: number
    });
  }

  defaultSrc = ev => {
    ev.target.src = "https://gitlab.com/favicon.ico";
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="loader">
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.jobFeeds.map(story => (
            <Card
              key={story.id}
              style={{
                width: "inherit",
                padding: 20,
                backgroundColor: "#fff5ee"
              }}
            >
              <Media>
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src={`http://${story.source}/favicon.ico`}
                  alt="not found"
                  onError={this.defaultSrc}
                />
                <Media.Body>
                  <a href={story.url} target="blank">
                    <b
                      style={{
                        marginLeft: -347,
                        color: "black",
                        fontSize: "large"
                      }}
                    >
                      {story.title}
                    </b>
                  </a>
                  <span>-({story.source})</span>
                  <br />
                  <span style={{ fontSize: "small" }}>{story.time}</span>
                  <span>
                    <a
                      href={`http://www.twitter.com/share?url=${story.url}`}
                      target="blank"
                    >
                      <Badge style={{ marginLeft: -330 }} variant="info">
                        Tweet
                      </Badge>
                    </a>
                  </span>
                </Media.Body>
              </Media>
            </Card>
          ))}
          <Button
            onClick={this.updateJobs}
            variant="danger"
            style={{ width: 1110 }}
          >
            + MORE JOBS
          </Button>
        </div>
      );
    }
  }
}

export default Job;
