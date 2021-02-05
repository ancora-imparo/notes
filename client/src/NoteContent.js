import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import axios from "axios";

import * as constants from "./constants";

const NoteContent = (props) => {
  const { noteSelected } = props;
  const [title, setTitle] = useState(noteSelected.title);
  const [content, setContent] = useState(noteSelected.noteContent);

  useEffect(() => {
    setTitle(noteSelected.title);
    setContent(noteSelected.noteContent);
  }, [noteSelected]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <Formik>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post(constants.ROUTE_NOTES, {
              title: title,
              noteContent: content,
              id: noteSelected.id,
              lastUpdated: Date(),
            });
            window.location.reload();
          } catch (err) {
            console.log(err.response);
          }
        }}>
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
          }}>
          <button>Cancel</button>
          {new Date(noteSelected.created).toLocaleString(
            "en-US",
            constants.TIME_FORMAT,
            {
              hour12: true,
            }
          )}
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

export default NoteContent;
