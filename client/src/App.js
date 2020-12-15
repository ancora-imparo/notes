import React, { useState } from "react";
import SplitPane from "react-split-pane";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { NotesList } from "./NotesList";
import Menu from "./Menu";
import { NoteContent } from "./NoteContent";

export const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const [notes, setNotes] = useState([
    {
      id: 0,
      title: "Weathering with you",
      created: Date(),
      lastUpdated: Date(),
      noteContent: "Welcome, this is a demo note.",
    },
    {
      id: 1,
      title: "Howl's moving castle",
      created: Date(),
      lastUpdated: Date(),
      noteContent:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      title: "Crash landing on you",
      created: Date(),
      lastUpdated: Date(),
      noteContent:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ]);

  const [selectedId, setSelectedId] = useState();
  const noteSelected = notes.find((note) => note.id === selectedId);

  const handleNoteSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <SplitPane split='vertical' minSize={500} primary='first'>
      <div style={{ backgroundColor: "#bbbb", height: "100vh" }}>
        <Button variant='contained' color='primary'>
          add note
        </Button>
        <List component='nav' className={useStyles.root} aria-label='contacts'>
          <NotesList notes={notes} handleNoteSelect={handleNoteSelect} />
        </List>
      </div>
      <div style={{ backgroundColor: "lightblue", height: "100vh" }}>
        <NoteContent noteSelected={noteSelected} />
        <div
          style={{
            backgroundColor: "turquoise",
            position: "absolute",
            bottom: "0px",
            width: "100%",
          }}>
          <Menu noteSelected={noteSelected} />
        </div>
      </div>
    </SplitPane>
  );
};
export default App;
