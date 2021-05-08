import _ from "lodash";

import { pool } from "./server";

const handleSQLQuery = async (sqlQuery, values?) => {
  try {
    const client = await pool.connect();
    const result = await client.query(sqlQuery, values);
    const results: any = _.get(result, "rows", null);
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
    `CREATE TABLE IF NOT EXISTS notes(id SERIAL PRIMARY KEY, title VARCHAR(32) NOT NULL, "noteContent" TEXT NOT NULL, created TIMESTAMPTZ, "lastUpdated" TIMESTAMPTZ);
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
  const currentTime = Date();
  await handleSQLQuery(
    `INSERT INTO notes (id, title, "noteContent", "lastUpdated", created)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (id)
  DO UPDATE SET
  title = $2, "noteContent" = $3 , "lastUpdated" = $4;`,
    [
      note.id,
      note.title,
      note.noteContent,
      new Date(currentTime),
      new Date(currentTime),
    ]
  );
  return note.id;
};

export const deleteNoteById = async (id: number): Promise<boolean> => {
  const [deleted] = await handleSQLQuery(
    `DELETE FROM notes WHERE id=${id} RETURNING id`
  );
  return !!deleted;
};
