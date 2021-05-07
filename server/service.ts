import _ from "lodash";

import { pool } from "./server";

const handleSQLQuery = async (sqlQuery) => {
  try {
    const client = await pool.connect();
    const result = await client.query(sqlQuery);
    const results = _.get(result, "rows", null);
    client.release();
    return results;
  } catch (err) {
    throw new Error(
      _.get(err, "message", "Error occurred at handleSQLQuery()")
    );
  }
};
const handleSaveNote = async (sqlQuery, values) => {
  try {
    const client = await pool.connect();
    const result = await client.query(sqlQuery, values);
    const results = _.get(result, "rows", null);
    client.release();
    return results;
  } catch (err) {
    throw new Error(
      _.get(err, "message", "Error occurred at handleSQLQuery()")
    );
  }
};

export const initialiseSQLTable = async (): Promise<void> => {
  await handleSQLQuery(
    `CREATE TABLE IF NOT EXISTS notes(id SERIAL PRIMARY KEY, title VARCHAR(30) NOT NULL, "noteContent" TEXT NOT NULL, created TIMESTAMPTZ, "lastUpdated" TIMESTAMPTZ);
    CREATE UNIQUE INDEX IF NOT EXISTS index ON notes(id);`
  );
};

export const getAllNotes = async (): Promise<Note[]> => {
  const notes = await handleSQLQuery(`SELECT * FROM notes`);
  return notes;
};

export const getNoteById = async (id: number): Promise<Note | undefined> => {
  const [note] = await handleSQLQuery(`SELECT * FROM notes WHERE id = ${id}`);
  return note;
};

export const saveNote = async (note: Note): Promise<number> => {
  const [noteExists] = await handleSQLQuery(
    `SELECT * FROM notes WHERE id = ${note.id}`
  );
  if (noteExists) {
    const updatedNote = { ...noteExists, ...note };
    updatedNote.lastUpdated = Date();
    await handleSaveNote(
      `UPDATE notes SET title = $1, "noteContent" = $2 , "lastUpdated" = $3 WHERE id = $4;`,
      [
        updatedNote.title,
        updatedNote.noteContent,
        new Date(updatedNote.lastUpdated),
        updatedNote.id,
      ]
    );
  } else {
    const newNote = {
      id: note.id,
      title: note.title,
      created: Date(),
      lastUpdated: Date(),
      noteContent: note.noteContent,
    };
    await handleSaveNote(
      `INSERT INTO notes(title, "noteContent", created, "lastUpdated") VALUES($1, $2, $3, $4)`,
      [
        newNote.title,
        newNote.noteContent,
        new Date(newNote.created),
        new Date(newNote.lastUpdated),
      ]
    );
  }
  return note.id;
};

export const deleteNoteById = async (id: number): Promise<boolean> => {
  const [deleted] = await handleSQLQuery(
    `DELETE FROM notes WHERE id=${id} RETURNING id`
  );
  return !!deleted;
};
