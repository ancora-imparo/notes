import _ from "lodash";

import * as store from "./store";

export const getAllNotes = async (): Promise<Note[]> => {
  const notes = await store.readNotes();
  return notes;
};

export const getNoteById = async (id: number): Promise<Note | undefined> => {
  const notes = await store.readNotes();
  const note = notes.find((element) => element.id === id);
  return note;
};

export const saveNote = async (note: Note): Promise<number> => {
  const notes = await store.readNotes();
  const noteIndex = _.findIndex(notes, (n: Note) => n.id === note.id);
  if (noteIndex >= 0) {
    const updatedNote = { ...notes[noteIndex], ...note };
    updatedNote.lastUpdated = Date();
    store.updateNote(updatedNote);
  } else {
    note.id = Math.max(0, ...notes.map((item) => item.id)) + 1;
    const newNote = {
      id: note.id,
      title: note.title,
      created: Date(),
      lastUpdated: Date(),
      noteContent: note.noteContent,
    };
    store.insertNote(newNote);
  }
  return note.id;
};

// export const deleteNoteById = async (id: number): Promise<boolean> => {
//   const notes = await store.readNotes();
//   const noteExist = notes.find((element) => element.id === id);
//   if (noteExist) {
//     const updatedNotes = notes.filter((element) => {
//       return element.id !== id;
//     });
//     await store.writeNotes(updatedNotes);
//   }
//   return !!noteExist;
// };
