import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { HtmlEditor, Toolbar, Editor } from "@aeaton/react-prosemirror";
import {
  plugins,
  schema,
  toolbar,
} from "@aeaton/react-prosemirror-config-default";
import { Formik, Form } from "formik";
import axios from "axios";
import { format } from "date-fns";

import * as constants from "./constants";
import "./editor.css";
const NoteContent = (props: {
  noteSelected?: DraftNote;
  setNotes: (notes: Note[]) => void;
  setNoteSelected: (noteSelected: Note) => void;
  handleCreateNote: () => void;
}): JSX.Element | null => {
  const { noteSelected, setNotes, setNoteSelected, handleCreateNote } = props;
  if (!noteSelected) {
    return null;
  }

  const [editorContent, setEditorContent] = useState(
    JSON.parse(noteSelected.noteContent)
  );
  const handleOnSubmit = async (values: { title?: string }) => {
    try {
      const postResponse = await axios.post(constants.ROUTE_NOTES, {
        title: values.title,
        noteContent: JSON.stringify(editorContent),
        id: noteSelected.id,
      });

      const response = await axios.get(constants.ROUTE_NOTES);
      setNotes(response.data);
      setNoteSelected(
        response.data.find((note: Note) => note.id === postResponse.data)
      );
    } catch (err) {
      console.error("error:", err.response);
    }
  };

  const CancelButton = withStyles(() => ({
    root: {
      color: "white",
      margin: "4px",
      fontSize: "100%",
      backgroundColor: "#d20202",
      "&:hover": {
        backgroundColor: "#ff1010",
      },
    },
  }))(Button);

  const SubmitButton = withStyles(() => ({
    root: {
      color: "white",
      margin: "4px",
      fontSize: "100%",
      backgroundColor: "#7fc01f",
      "&:hover": {
        backgroundColor: "#3aad13",
      },
    },
  }))(Button);

  return (
    <Formik
      initialValues={{ title: noteSelected.title }}
      onSubmit={(values) => {
        handleOnSubmit(values);
      }}>
      {({ values, handleChange }) => (
        <Form>
          <TextField
            id="title"
            name="title"
            label="Title"
            InputLabelProps={{ style: { fontSize: 33, margin: "10px" } }}
            inputProps={{ style: { fontSize: 36, margin: "10px" } }}
            value={values.title}
            onChange={handleChange}
            fullWidth
          />
          <div style={{ margin: "4px" }}>
            <HtmlEditor
              schema={schema}
              plugins={plugins}
              value={editorContent}
              handleChange={setEditorContent}
              debounce={250}>
              <Toolbar toolbar={toolbar} />
              <Editor autoFocus />
            </HtmlEditor>
          </div>
          <div
            style={{
              backgroundColor: "turquoise",
              position: "absolute",
              bottom: "0px",
              width: "100%",
            }}>
            <CancelButton
              variant="contained"
              color="primary"
              onClick={handleCreateNote}>
              Cancel
            </CancelButton>
            {format(
              new Date(noteSelected.created),
              ` ${constants.TIME_FORMAT}`
            )}
            <SubmitButton
              variant="contained"
              color="primary"
              style={{ float: "right" }}
              type="submit">
              {!noteSelected.id ? `Create` : `Save`}
            </SubmitButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteContent;
