import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";

export const NotesList = (props) => {
  const { notes, handleNoteSelect } = props;
  function stringCheck(str) {
    if (str.length > 10) str = str.substring(0, 10);
    return str;
  }

  const List = notes.map((note) => (
    <ListItem
      key={note.id}
      button
      onClick={() => {
        handleNoteSelect(note.id);
      }}>
      <ListItemText
        primary={note.title}
        secondary={
          <div>
            <div> {stringCheck(note.noteContent)} </div>
            <div style={{ float: "right" }}>
              {new Date(note.created).toLocaleDateString()}
            </div>
          </div>
        }></ListItemText>
    </ListItem>
  ));

  return <div>{List}</div>;
};
NotesList.propTypes = {
  notes: PropTypes.object,
  handleNoteSelect: PropTypes.func,
};
