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
                    by {story.by}
                  </Card.Subtitle>
                  <Card.Text>
                    {story.score} points {" "}{story.time}
                    <Button variant="Dark">{story.comments} comments</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
            <Button variant="danger" style={{ width: 1110 }}>+ MORE NEWS</Button>
          </div>
        );
      }
}
 
export default Show;