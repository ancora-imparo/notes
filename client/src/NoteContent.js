import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import axios from "axios";

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

  let options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const checkCreated = noteSelected
    ? new Date(noteSelected.created).toLocaleString("en-US", options, {
        hour12: true,
      })
    : " ";

  <div>
    <button>Cancel</button> {checkCreated}{" "}
    <button style={{ float: "right" }}>Save</button>
  </div>;

  return (
    <Formik>
      <Form
        onSubmit={() => {
          axios
            .post(`http://localhost:5000/notes`, {
              title: title,
              noteContent: content,
            })
            .then((res) => {
              console.log(res);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
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
        <div
          style={{
            backgroundColor: "turquoise",
            position: "absolute",
            bottom: "0px",
            width: "100%",
          }}
        >
          <button>Cancel</button> {checkCreated}{" "}
          <button style={{ float: "right" }} type="submit">
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
};
NoteContent.propTypes = {
  noteSelected: PropTypes.objectOf(
    PropTypes.shape({ title: PropTypes.string, noteContent: PropTypes.string })
  ),
};
