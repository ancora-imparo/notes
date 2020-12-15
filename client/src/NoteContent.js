import React, { useEffect, useState } from "react";
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
  const [title, setTitle] = useState(checkTitle);
  const checkNoteContent = noteSelected ? noteSelected.noteContent : " ";
  const [content, setContent] = useState(checkNoteContent);

  useEffect(() => {
    setTitle(checkTitle);
    setContent(checkNoteContent);
  }, [noteSelected]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <div>
      <div>
        <TextField
          id='title'
          label='Title'
          value={title}
          fullWidth
          onChange={handleTitleChange}
        />
        <TextField
          id='content'
          label='Content'
          style={{ margin: 8 }}
          margin='normal'
          rowsMax={40}
          value={content}
          fullWidth
          multiline
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};
