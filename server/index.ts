import express from "express";
import cors from "cors";

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
app.delete("/notes/:id", controller.deleteNoteById);

export default app;
