import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { stringPreview } from "./utils";

const NotesList = (props: {
  notes: Note[];
  handleNoteSelect: (id: number) => void;
}): JSX.Element => {
  const { notes, handleNoteSelect } = props;
  const List = notes.map((note) => (
    <ListItem
      key={note.id}
      component="span"
      button
      onClick={() => {
        handleNoteSelect(note.id);
      }}>
      <ListItemText
        primary={note.title}
        secondary={
          <span>
            <span> {stringPreview(note.noteContent)} </span>
            <span style={{ float: "right" }}>
              {format(new Date(note.created), "dd/MM/yyyy")}
            </span>
          </span>
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
