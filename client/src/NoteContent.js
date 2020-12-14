import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const NoteContent = (props) => {
  const { noteSelected } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();
  const checkTitle = noteSelected ? noteSelected.title : " ";
  const [value, setValue] = React.useState(checkTitle);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
        <div>
          <TextField
            id='standard-multiline-flexible'
            label='Title'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id='standard-full-width'
            style={{ margin: 8 }}
            rowsMax={40}
            placeholder='This is a note'
            fullWidth
            multiline
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
    </div>
  );
};
