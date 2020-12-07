import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export const NotesList = (props) => {
  function stringCheck(str) {
    if (str.length > 10) str = str.substring(0, 10);
    return str;
  }
  // eslint-disable-next-line react/prop-types
  const List = props.notes.map((note) => (
    <ListItem key={note.id} button>
      <ListItemText
        primary={note.title}
        secondary={stringCheck(note.noteContent)}></ListItemText>
    </ListItem>
  ));

  return <div>{List}</div>;
};
