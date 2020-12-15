import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

export const NoteContent = (props) => {
  const { noteSelected } = props;

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
          id="title"
          label="Title"
          value={title}
          fullWidth
          onChange={handleTitleChange}
        />
        <TextField
          id="content"
          label="Content"
          style={{ margin: 8 }}
          margin="normal"
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
NoteContent.propTypes = {
  noteSelected: PropTypes.objectOf(
    PropTypes.shape({ title: PropTypes.string, noteContent: PropTypes.string })
  ),
};
