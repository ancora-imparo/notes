import React from 'react';
import { Component } from 'react';
import SplitPane from 'react-split-pane';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import NotesList from './NotesList'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));



export default class Edit extends Component { 
  render () { 
    return (
      <SplitPane split="vertical" minSize={500} primary="first">
      
          <div style={{backgroundColor: '#bbbb', height:"100vh"}}>
            <Button variant="contained" color="primary">
              add note
            </Button>
            <List component="nav" className={useStyles.root} aria-label="contacts">
              <NotesList/>
            </List>
          </div>
          <div style={{backgroundColor: 'lightblue', height:"100vh"}}>Right Pane</div>
         
        </SplitPane>
      );
        
  }
}
          
