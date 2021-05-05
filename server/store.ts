import * as pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const initialiseTable = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `create table notes(id serial primary key,title varchar(30) not null , "noteContent" text not null,created text,  "lastUpdated"  text)`
    );
    const results = { results: result ? result.rows : null };
    client.release();
  } catch (err) {
    console.error(err);
  }
};
initialiseTable();

export const readNotes = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM notes");
    const { results } = { results: result ? result.rows : null };
    return results;
    client.release();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const insertNote = async (note: Note): Promise<any> => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `insert into notes(title, "noteContent", created, "lastUpdated") values('${note.title}', '${note.noteContent}', '${note.created}','${note.lastUpdated}')`
    );
    const results = { results: result ? result.rows : null };
    return results;
    client.release();
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const updateNote = async (note): Promise<any> => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE notes SET title = '${note.title}', "noteContent" = '${note.noteContent}' , "lastUpdated" = '${note.lastUpdated}' WHERE id = ${note.id};`
    );
    const results = { results: result ? result.rows : null };
    return results;
    client.release();
  } catch (err) {
    console.error(err);
    return err;
  }
};

// export const readNotes = async (filepath = "./data.json"): Promise<Note[]> => {
//   try {
//     const notes = await readFile(filepath);
//     return JSON.parse(notes.toString());
//   } catch (error) {
//     return [];
//   }
// };

// export const writeNotes = async (
//   notesObj: Note[],
//   filepath = "./data.json"
// ): Promise<void> => {
//   await writeFile(filepath, JSON.stringify(notesObj));
// };
