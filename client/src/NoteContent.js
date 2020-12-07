import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


 export const NoteContent = (props) =>  {
  const {noteSelected} = props;
    const useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));

  const classes = useStyles();
  const checkTitle = noteSelected ? noteSelected.title : " ";
  const [value, setValue] = React.useState(checkTitle);
  const handleChange = (event) => {
    setValue(event.target.value);}
  return (<div>
 
  <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Title"
          multiline
          rowsMax={4}
         
          onChange={handleChange}
        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Content"
          multiline
          
          defaultValue="This is a demo note"
        />
      </div>
    </form>
  
  </div>);
}

