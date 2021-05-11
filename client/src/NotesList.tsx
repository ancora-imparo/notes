import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { format } from "date-fns";
import { stringPreview } from "./utils";

const NotesList = (props: {
  notes: Note[];
  handleNoteSelect: (id: string) => void;
}): JSX.Element => {
  const { notes, handleNoteSelect } = props;
  const List = notes.map((note) => (
    <ListItem
      key={note.id}
      component="span"
      button
      onClick={() => {
        handleNoteSelect(note.id!);
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
export default NotesList;
