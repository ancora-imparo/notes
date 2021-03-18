import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { HtmlEditor, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";
import { Formik, Form } from "formik";
import axios from "axios";
import { format } from "date-fns";

import * as constants from "./constants";
import "./editor.css";

const NoteContent = (props) => {
  const { noteSelected } = props;

  if (!noteSelected) {
    return null;
  }

  const [editorContent, setEditorContent] = useState(
    JSON.parse(noteSelected.noteContent)
  );

  return (
    <Formik initialValues={{ title: noteSelected.title }}>
      {({ values, handleChange }) => (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(constants.ROUTE_NOTES, {
                title: values.title,
                noteContent: JSON.stringify(editorContent),
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
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            fullWidth
          />
          <HtmlEditor
            options={options}
            value={editorContent}
            onChange={(c) => {
              setEditorContent(c);
            }}
            render={({ editor, view }) => (
              <div style={{ margin: 5 }}>
                <MenuBar menu={menu} view={view} />
                {editor}
              </div>
            )}
          />
          <div
            style={{
              backgroundColor: "turquoise",
              position: "absolute",
              bottom: "0px",
              width: "100%",
            }}>
            <button>Cancel</button>
            {format(
              new Date(noteSelected.created),
              ` ${constants.TIME_FORMAT}`
            )}
            <button style={{ float: "right" }} type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
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
