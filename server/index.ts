import express from "express";
import cors from "cors";
import * as pg from "pg";

import * as controller from "./controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", controller.getHealthCheck);

// Get all notes
app.get("/notes", controller.getAllNotes);

// Get notes by id
app.get("/notes/:id", controller.getNoteById);

//Post: Making a new note
app.post("/notes", controller.saveNote);

// Delete note by id
// app.delete("/notes/:id", controller.deleteNoteById);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM notes");
    const { results } = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

export default app;
