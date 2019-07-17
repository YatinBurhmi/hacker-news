import React, { Component } from "react";
import fetchLiveAskStories from "../api-functions/askStories";
import { Card, Button } from "react-bootstrap";
var number = 0;

export class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askStories: []
    };
  }

  async componentDidMount() {
    var allThePromisies = fetchLiveAskStories(number);
    var askStories = await allThePromisies;
    this.setState({
     askStories: askStories
    });
  }

  render() {
    return (
      <div>
        {Object.values(this.state.askStories).map(story => (
          <Card key={story.id} style={{ width: "inherit", height: "7rem" }}>
            <Card.Body>
              <Card.Title>{story.title}</Card.Title>
              <Card.Subtitle className="mb-2">
                <b> by {story.by} </b>
              </Card.Subtitle>
              <Card.Text>
                <b>{story.score} points</b> <b>{story.time}</b>
                <Button variant="link">{story.comments} comments</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Ask;
