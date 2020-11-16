import { Component } from 'react';
import SplitPane from 'react-split-pane';
import './App.css'



export default class Edit extends Component { 
  render () { 
    return (
      <SplitPane split="vertical" minSize={500} primary="first">
      
          <div className="App-header" style={{backgroundColor: '#bbbb'}}>Left Pane</div>
          <div className="App-header" style={{backgroundColor: 'lightblue'}}>Right Pane</div>
         
        </SplitPane>
      );
        
  }
}
          
