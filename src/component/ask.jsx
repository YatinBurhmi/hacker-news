import React, { Component } from "react";
import fetchLiveAskStories from "../api-functions/askStories";
import { Card, Button, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
var number = 0;

export class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askStories: [],
      numberOfStories:0
    };
    this.updateStories = this.updateStories.bind(this);
  }

  async componentDidMount() {
    var allThePromisies = fetchLiveAskStories(number);
    var askStories = await allThePromisies;
    this.setState({
      askStories: askStories
    });
  }

  async updateStories() {
    var number = this.state.numberOfStories;
    number = number + 30;
    var allThePromisies = fetchLiveAskStories(number);
    var askStories = await allThePromisies;
    this.setState({
      askStories: askStories,
      numberOfStories: number
    });
  }

  render() {
    return (
      <div>
        {Object.values(this.state.askStories).map(story => (
          <Card
            key={story.id}
            style={{ width: "inherit", height: "7rem", padding: 20, backgroundColor:"#fdf5e2" }}
          >
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={require("../images/ask-question-1-ff9bc6fa5eaa0d7667ae7a5a4c61330c.jpg")}
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
                <br />
                <span>By - {story.by}</span>
                <br />
                <span style={{ fontSize: "small" }}>
                  <b>{story.score}-Points</b>{" "}
                  <b style={{ paddingLeft: 10 }}>{story.time}</b>
                </span>
                <span>
                  <Link
                    style={{ marginLeft: -320, color: "orange" }}
                    to={{
                      pathname: "/comments",
                      state: { comment: story.object }
                    }}
                  >
                    {story.comments}-Comments
                  </Link>
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

export default Ask;
