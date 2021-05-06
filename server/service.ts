import _ from "lodash";

import { pool } from "./server";

const handleSQLQuery = async (sqlQuery) => {
  try {
    const client = await pool.connect();
    const result = await client.query(sqlQuery);
    const { results } = { results: result ? result.rows : null };
    client.release();
    return results!;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const initialiseSQLTable = async (): Promise<void> => {
  await handleSQLQuery(
    `CREATE TABLE IF NOT EXISTS notes(id serial primary key,title varchar(30) not null , "noteContent" text not null,created text,  "lastUpdated"  text)`
  );
};

export const getAllNotes = async (): Promise<Note[]> => {
  const notes = await handleSQLQuery(`SELECT * FROM notes`);
  return notes;
};

export const getNoteById = async (id: number): Promise<Note | undefined> => {
  const notes = await handleSQLQuery(`SELECT * FROM notes`);
  const note = notes.find((element) => element.id === id);
  return note;
};

export const saveNote = async (note: Note): Promise<number> => {
  const notes: Note[] = await handleSQLQuery(`SELECT * FROM notes`);
  const noteIndex = _.findIndex(notes, (n) => n.id === note.id);
  if (noteIndex >= 0) {
    const updatedNote = { ...notes[noteIndex], ...note };
    updatedNote.lastUpdated = Date();
    handleSQLQuery(
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
    handleSQLQuery(
      `INSERT INTO notes(title, "noteContent", created, "lastUpdated") values('${newNote.title}', '${newNote.noteContent}', '${newNote.created}','${newNote.lastUpdated}')`
    );
  }
  return note.id;
};

export const deleteNoteById = async (id: number): Promise<boolean> => {
  const [deleted] = await handleSQLQuery(
    `DELETE FROM notes where id=${id} RETURNING id`
  );
  return !!deleted;
};
