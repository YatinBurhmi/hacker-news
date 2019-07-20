import React, { Component } from "react";
import fetchLiveStories from "../api-functions/stories";
import { Card, Button, Media, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
var number = 0;

export class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveStories: [],
      numberOfStories:0
    };
    this.updateStories = this.updateStories.bind(this);
  }

  async componentDidMount() {
    var allThePromisies = fetchLiveStories(number);
    var liveStories = await allThePromisies;
    this.setState({
      liveStories: liveStories
    });
  }

  async updateStories(){
    var number = this.state.numberOfStories;
    number = number+30;
    var allThePromisies = fetchLiveStories(number);
    var liveStories = await allThePromisies;
    this.setState({
       liveStories: liveStories,
       numberOfStories: number
     });
   } 

  render() {
    return (
      <div>
        {this.state.liveStories.map(story => (
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
                <span>By - {story.by}</span>
                <br />
                <span style={{fontSize:"small"}}>
                  <b>{story.score}-Points</b>{" "}<b style={{paddingLeft:10}}>{story.time}</b>
                </span>
                <span>
                  <Link
                    style={{ marginLeft: -320, color: "orange" }}
                    to={{
                      pathname: "/comments",
                     state: { comment:story.object }
                    }}
                  >
                    {story.comments}-Comments
                  </Link>
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
        <Button onClick={this.updateStories} variant="danger" style={{ width: 1110 }}>
          + MORE NEWS
        </Button>
      </div>
    );
  }
}

export default home;
