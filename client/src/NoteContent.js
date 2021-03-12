import React, { useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import axios from "axios";
import { format } from "date-fns";

import * as constants from "./constants";
import CustomEditor from "./CustomEditor";

const NoteContent = (props) => {
  const { noteSelected } = props;
  const [title, setTitle] = useState(noteSelected.title);
  const [content, setContent] = useState(JSON.parse(noteSelected.noteContent));
  useEffect(() => {
    setTitle(noteSelected.title);
    setContent(JSON.parse(noteSelected.noteContent));
  }, [noteSelected]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
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
            console.error("error:", err.response);
          }
        }}>
        <TextField
          id="title"
          label="Title"
          value={title}
          fullWidth
          onChange={handleTitleChange}
        />
        <CustomEditor content={content} setContent={setContent} />
        <div
          style={{
            backgroundColor: "turquoise",
            position: "absolute",
            bottom: "0px",
            width: "100%",
          }}>
          <button>Cancel</button>
          {format(new Date(noteSelected.created), ` ${constants.TIME_FORMAT}`)}
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
    PropTypes.shape({
      title: PropTypes.string,
      noteContent: PropTypes.string,
      id: PropTypes.number,
    })
  ),
};

export default NoteContent;
