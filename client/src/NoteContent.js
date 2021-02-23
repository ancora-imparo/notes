import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import axios from "axios";
import { format } from "date-fns";
import styled from "styled-components";
import { Editor, Floater, MenuBar } from "@aeaton/react-prosemirror";
import { options, menu } from "@aeaton/react-prosemirror-config-default";

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

  const Container = styled("div")`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `;
  const Input = styled("div")`
    width: 100%;
    height: 50%;
    overflow-y: auto;
  `;
  const Output = styled("pre")`
    width: 100%;
    height: 50%;
    overflow-y: auto;
    padding: 1em;
    background: black;
    color: lawngreen;
  `;

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
        }}
      >
        <TextField
          id="title"
          label="Title"
          value={title}
          fullWidth
          onChange={handleTitleChange}
        />
        <Container>
          <Input>
            <Editor
              options={options}
              onChange={(doc) => {
                document.getElementById("output").textContent = JSON.stringify(
                  doc,
                  null,
                  2
                );
              }}
              render={({ editor, view }) => (
                <React.Fragment>
                  <MenuBar menu={menu} view={view} />

                  <Floater view={view}>
                    <MenuBar menu={{ marks: menu.marks }} view={view} />
                  </Floater>

                  {editor}
                </React.Fragment>
              )}
            />
          </Input>
          <Output id={"output"} />
        </Container>
        ,
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
    PropTypes.shape({ title: PropTypes.string, noteContent: PropTypes.string })
  ),
};

export default NoteContent;
