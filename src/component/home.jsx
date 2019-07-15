import React, { Component } from 'react'
import fetchLiveStories from '../api-functions/stories';
var number=0;

export class home extends Component {
    constructor(props){
        super(props);
        this.state={
            liveStories:[],
        }
    }
    
    
    async componentDidMount(){
        var allThePromisies = fetchLiveStories(number);
        var liveStories = await Promise.all(allThePromisies);
        this.setState({
         liveStories:liveStories 
        }) 
      
        }
      
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default home
