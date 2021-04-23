import express from "express";
import cors from "cors";

import * as controller from "./controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", controller.getHealthCheck);

// Get all notes
app.get("/notes", controller.getAllNotesHandler);

// Get notes by id
app.get("/notes/:id", controller.getNoteByIdHandler);

//Post: Making a new note
app.post("/notes", controller.saveNoteHandler);

// Delete note by id
app.delete("/notes/:id", controller.deleteNoteByIdHandler);

export default app;
