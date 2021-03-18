import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { stringPreview } from "./utils";

const NotesList = (props) => {
  const { notes, handleNoteSelect } = props;

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
            <div> {stringPreview(note.noteContent)} </div>
            <div style={{ float: "right" }}>
              {format(new Date(note.created), "dd/MM/yyyy")}
            </div>
          </div>
        }></ListItemText>
    </ListItem>
  ));

  return <div>{List}</div>;
};
NotesList.propTypes = {
  notes: PropTypes.array,
  handleNoteSelect: PropTypes.func,
};

export default NotesList;
