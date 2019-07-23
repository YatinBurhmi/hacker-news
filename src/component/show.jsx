import React, { Component } from "react";
import { Button, Card, Badge, Media, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";
import fetchShowStories from "../api-functions/showstories";
import "../css/loadingIcon.css";
var number = 0;

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showStories: [],
      numberOfStories: 0
    };
    this.updateStories = this.updateStories.bind(this);
  }

  async componentDidMount() {
    var allThePromisies = fetchShowStories(number);
    var showStories = await allThePromisies;
    this.setState({
      isLoaded: true,
      showStories: showStories
    });
  }

  async updateStories() {
    var number = this.state.numberOfStories;
    number = number + 30;
    var allThePromisies = fetchShowStories(number);
    var showStories = await allThePromisies;
    this.setState({
      showStories: showStories,
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
          {this.state.showStories.map(story => (
            <Card
              key={story.id}
              style={{
                width: "inherit",
                padding: 20,
                backgroundColor: "#fdf5e2"
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
                  <span>By - {story.by}</span>
                  <br />
                  <span style={{ fontSize: "small" }}>
                    <b>{story.score}-Points</b>{" "}
                    <b style={{ paddingLeft: 10 }}>{story.time}</b>
                  </span>
                  {/* <span>
                    <Link
                      style={{ marginLeft: -320, color: "orange" }}
                      to={{
                        pathname: "/comments",
                        state: { comment: story.object }
                      }}
                    >
                      {story.comments}-Comments
                    </Link>
                  </span> */}
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
            onClick={this.updateStories}
            variant="danger"
            style={{ width: 1110 }}
          >
            + MORE
          </Button>
        </div>
      );
    }
  }
}

export default Show;
