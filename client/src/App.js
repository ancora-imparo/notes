import React, { useState, useEffect } from "react";
import SplitPane from "react-split-pane";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import axios from "axios";

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
      const get_notes = response.data;
      setNotes(get_notes);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [noteSelected, setNoteSelected] = useState();

  const handleNoteSelect = (id) => {
    setNoteSelected(notes.find((note) => note.id === id));
  };

  return (
    <SplitPane split="vertical" minSize={500} primary="first">
      <div style={{ backgroundColor: "#bbbb", height: "100vh" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setNoteSelected({
              id: 0,
              title: "",
              noteContent: "",
              created: Date(),
            });
          }}>
          Add Note
        </Button>
        <List component="nav" className={useStyles.root} aria-label="contacts">
          <NotesList notes={notes} handleNoteSelect={handleNoteSelect} />
        </List>
      </div>
      <div style={{ backgroundColor: "lightblue", height: "100vh" }}>
        {noteSelected ? <NoteContent noteSelected={noteSelected} /> : null}
      </div>
    </SplitPane>
  );
};
export default App;
