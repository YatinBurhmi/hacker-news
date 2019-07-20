import React, { Component } from "react";
import { Button, Card, Media, Badge } from "react-bootstrap";
import fetchJobStories from "../api-functions/jobsStories";
var number = 0;

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobFeeds: [],
      numberOfStories: 0
    };
    this.updateJobs = this.updateJobs.bind(this);
  }

  async componentDidMount() {
    var allThePromisies = fetchJobStories(number);
    var jobFeeds = await allThePromisies;
    this.setState({
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
  render() {
    return (
      <div>
        {Object.values(this.state.jobFeeds).map(story => (
          <Card
            key={story.id}
            style={{ width: "inherit", height: "7rem", padding: 20, backgroundColor:"#fdf5e2" }}
          >
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={`http://${story.source}/favicon.ico`}
                alt=""
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
                <span style={{fontSize:"small"}}>
                  {story.time}
                </span>
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
        <Button onClick={this.updateJobs} variant="danger" style={{ width: 1110 }}>
          + MORE JOBS
        </Button>
      </div>
    );
  }
}

export default Job;
