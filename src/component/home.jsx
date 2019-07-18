import React, { Component } from "react";
import fetchLiveStories from "../api-functions/stories";
import { Card, Button } from "react-bootstrap";


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
    var number = this.state.numberOfStories;
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
        {Object.values(this.state.liveStories).map(story => (
          <Card key={story.id} style={{ width: "inherit", height: "7rem" }}>
            <Card.Body>
              <Card.Title>{story.title}</Card.Title>
              <Card.Subtitle className="mb-2">by {story.by}</Card.Subtitle>
              <Card.Text>
                {story.score} points{"  "}
                {story.time}{" "}
                <Button id={story.id} variant="Light">
                  {story.comments} comments
                </Button>{" "}
                <a className="twitter-share-button" href={`http://www.twitter.com/share?url=${story.url}`}>
                  <b style={{color:"black"}}>Tweet</b>
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <button onClick={this.updateStories}>More</button>
      </div>
    );
  }
}

export default home;
