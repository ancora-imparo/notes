import React, { useState, useEffect } from "react";
import SplitPane from "react-split-pane";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import axios from "axios";
import { get } from "lodash";

import NotesList from "./NotesList";
import NoteContent from "./NoteContent";
import * as constants from "./constants";

export const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const [notes, setNotes] = useState([]);
  useEffect(async () => {
    try {
      const response = await axios.get(constants.ROUTE_NOTES);
      setNotes(response.data);
    } catch (err) {
      console.error("error:", err);
    }
  }, []);

  const [noteSelected, setNoteSelected] = useState();

  const handleNoteSelect = (id) => {
    setNoteSelected(notes.find((note) => note.id === id));
  };
  const handleCreateNote = () => {
    setNoteSelected({
      id: 0,
      title: "",
      noteContent: '"<p></p>"',
      created: Date(),
    });
  };

  const AddButton = withStyles(() => ({
    root: {
      color: "white",
      margin: "4px",
      fontSize: "100%",
      backgroundColor: "#be01ff",
      "&:hover": {
        backgroundColor: "#d353ff",
      },
    },
  }))(Button);

  return (
    <SplitPane split="vertical" minSize={500} primary="first">
      <div style={{ backgroundColor: "#bbbb", height: "100vh" }}>
        <AddButton
          variant="contained"
          color="primary"
          onClick={handleCreateNote}>
          Add Note
        </AddButton>
        <List component="nav" className={useStyles.root} aria-label="contacts">
          <NotesList notes={notes} handleNoteSelect={handleNoteSelect} />
        </List>
      </div>
      <div style={{ backgroundColor: "lightblue", height: "100vh" }}>
        <NoteContent
          key={get(noteSelected, "id", undefined)}
          noteSelected={noteSelected}
          setNoteSelected={setNoteSelected}
          setNotes={setNotes}
          handleCreateNote={handleCreateNote}
        />
      </div>
    </SplitPane>
  );
};
export default App;
