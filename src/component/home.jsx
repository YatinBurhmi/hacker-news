import React, { Component } from "react";
import fetchLiveStories from "../api-functions/stories";
import { Card, Button, Media, Badge } from "react-bootstrap";
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
          <Card
            key={story.id}
            style={{ width: "inherit", height: "7rem", padding: 20 }}
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
                <span>By - {story.by}</span>
                <br />
                <span>
                  {story.score} {story.time} {story.comments}
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
        <Button variant="danger" style={{ width: 1110 }}>
          + MORE NEWS
        </Button>
      </div>
    );
  }
}

export default home;
