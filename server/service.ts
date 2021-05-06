import _ from "lodash";
import { pool } from "./server";

const readNotes = async (): Promise<Note[]> => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM notes");
    const { results } = { results: result ? result.rows : null };
    client.release();
    return results!;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const saveNoteQuery = async (note: Note, sqlQuery): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query(sqlQuery);
    client.release();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const initialiseSQLTable = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query(
      `CREATE TABLE IF NOT EXISTS notes(id serial primary key,title varchar(30) not null , "noteContent" text not null,created text,  "lastUpdated"  text)`
    );
    client.release();
  } catch (err) {
    console.error(err);
  }
};
export const getAllNotes = async (): Promise<Note[]> => {
  const notes = await readNotes();
  return notes;
};

export const getNoteById = async (id: number): Promise<Note | undefined> => {
  const notes = await readNotes();
  const note = notes.find((element) => element.id === id);
  return note;
};

export const saveNote = async (note: Note): Promise<number> => {
  const notes = await readNotes();
  const noteIndex = _.findIndex(notes, (n: Note) => n.id === note.id);
  if (noteIndex >= 0) {
    const updatedNote = { ...notes[noteIndex], ...note };
    updatedNote.lastUpdated = Date();
    saveNoteQuery(
      updatedNote,
      `UPDATE notes SET title = '${updatedNote.title}', "noteContent" = '${updatedNote.noteContent}' , "lastUpdated" = '${updatedNote.lastUpdated}' WHERE id = ${updatedNote.id};`
    );
  } else {
    const newNote = {
      id: note.id,
      title: note.title,
      created: Date(),
      lastUpdated: Date(),
      noteContent: note.noteContent,
    };
    saveNoteQuery(
      newNote,
      `INSERT INTO notes(title, "noteContent", created, "lastUpdated") values('${newNote.title}', '${newNote.noteContent}', '${newNote.created}','${newNote.lastUpdated}')`
    );
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
