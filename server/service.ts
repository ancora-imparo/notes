import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { pool } from "./server";

const handleSQLQuery = async (sqlQuery, values?) => {
  const client = await pool.connect();
  const result = await client.query(sqlQuery, values);
  const results: any = _.get(result, "rows", null);
  client.release();
  return results;
};

export const initialiseSQLTable = async (): Promise<void> => {
  await handleSQLQuery(
    `CREATE TABLE IF NOT EXISTS notes(id uuid PRIMARY KEY, title VARCHAR(32) NOT NULL, "noteContent" TEXT NOT NULL, created TIMESTAMPTZ, "lastUpdated" TIMESTAMPTZ);
    CREATE UNIQUE INDEX IF NOT EXISTS index ON notes(id);`
  );
};

export const getAllNotes = async (): Promise<Note[]> => {
  const notes = await handleSQLQuery(`SELECT * FROM notes`);
  return notes;
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  try {
    const [note] = await handleSQLQuery(
      `SELECT * FROM notes WHERE id = '${id}'`
    );
    return note;
  } catch (_) {
    return;
  }
};

export const saveNote = async (note: Note): Promise<string> => {
  const [noteExists] =
    !!note.id &&
    (await handleSQLQuery(`SELECT * FROM notes WHERE id = '${note.id}'`));

  const now = new Date();
  const emptyNote = { id: uuidv4(), created: now };
  const mergedNote: Note = _.merge(emptyNote, noteExists, note, {
    lastUpdated: now,
  });
  await handleSQLQuery(
    `INSERT INTO notes (id, title, "noteContent", "lastUpdated", created)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (id)
  DO UPDATE SET
  title = $2, "noteContent" = $3 , "lastUpdated" = $4;`,
    [
      mergedNote.id,
      mergedNote.title,
      mergedNote.noteContent,
      mergedNote.lastUpdated,
      mergedNote.created,
    ]
  );
  return note.id;
};

export const deleteNoteById = async (id: string): Promise<boolean> => {
  const [deleted] = await handleSQLQuery(
    `DELETE FROM notes WHERE id='${id}' RETURNING id`
  );
  return !!deleted;
};
