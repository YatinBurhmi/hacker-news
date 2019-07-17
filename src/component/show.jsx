import React, { Component } from "react";
import {Button, Card} from "react-bootstrap";
import fetchShowStories from "../api-functions/showstories"
var number = 0;

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showStories: []
        };
      }
    
      async componentDidMount() {
        var allThePromisies = fetchShowStories(number);
        var showStories = await allThePromisies;
        this.setState({
          showStories: showStories
        });
      }
    
      render() {
        return (
          <div>
            {Object.values(this.state.showStories).map(story => (
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
 
export default Show;
