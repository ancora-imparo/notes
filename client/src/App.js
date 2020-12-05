import { Component } from 'react';
import SplitPane from 'react-split-pane';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
              <ListItem button>
                <ListItemText primary="Weathering with you" 
                secondary= {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}/>
              </ListItem>
              <Divider variant="primary" component="li" />
              <ListItem alignItems="flex-start" button>
                <ListItemText primary="Your name" secondary={"Contrary to popular belief, Lorem Ipsum is not simply random text. "}/>
              </ListItem>
              <Divider variant="primary" component="li" />
              <ListItem button>
                <ListItemText primary="Crash Landing on You" />
              </ListItem>
              <Divider variant="primary" component="li" />
              <ListItem button>
                <ListItemText primary="A Girl who leapt through time" />
              </ListItem>
              <Divider variant="primary" component="li" />
              <ListItem button>
                <ListItemText primary="Howl's moving castle" />
              </ListItem>
              <Divider variant="primary" component="li" />
            </List>
          </div>
          <div style={{backgroundColor: 'lightblue', height:"100vh"}}>Right Pane</div>
         
        </SplitPane>
      );
        
  }
}
          
