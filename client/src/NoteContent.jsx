import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { HtmlEditor, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";
import { Formik, Form } from "formik";
import axios from "axios";
import { format } from "date-fns";

import * as constants from "./constants";
import "./editor.css";

const NoteContent = (props) => {
  const { noteSelected, setNotes, setNoteSelected, handleCreateNote } = props;

  if (!noteSelected) {
    return null;
  }

  const [editorContent, setEditorContent] = useState(
    JSON.parse(noteSelected.noteContent)
  );
  const handleOnSubmit = async (values) => {
    try {
      const postResponse = await axios.post(constants.ROUTE_NOTES, {
        title: values.title,
        noteContent: JSON.stringify(editorContent),
        id: noteSelected.id,
        lastUpdated: Date(),
      });

      const response = await axios.get(constants.ROUTE_NOTES);
      setNotes(response.data);
      setNoteSelected(
        response.data.find((note) => note.id === postResponse.data)
      );
    } catch (err) {
      console.error("error:", err.response);
    }
  };

  return (
    <Formik initialValues={{ title: noteSelected.title }}>
      {({ values, handleChange }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit(values);
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCreateNote}>
              Cancel
            </Button>
            {format(
              new Date(noteSelected.created),
              ` ${constants.TIME_FORMAT}`
            )}
            <Button
              variant="contained"
              color="primary"
              style={{ float: "right" }}
              type="submit">
              {noteSelected.id == 0 ? `Create` : `Save`}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
NoteContent.propTypes = {
  setNotes: PropTypes.func,
  setNoteSelected: PropTypes.func,
  noteSelected: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      noteContent: PropTypes.string,
      id: PropTypes.number,
    })
  ),
};

export default NoteContent;
