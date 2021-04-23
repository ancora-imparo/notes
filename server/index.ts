import express from "express";
import joi from "joi";
import cors from "cors";

import * as service from "./service";

const app = express();
app.use(cors());
app.use(express.json());

const getHealthCheck = (req, res) => {
  res.status(200).send();
};
app.get("/", getHealthCheck);

// Get all notes
const getAllNotesHandler = async (req, res) => {
  const notes = await service.getAllNotes();
  res.status(200).send(notes);
};
app.get("/notes", getAllNotesHandler);

// Get notes by id
const getNoteByIdHandler = async (req, res) => {
  const id = parseInt(req.params["id"], 10);
  const note = await service.getNoteById(id);
  if (!note) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).send(note);
  }
};
app.get("/notes/:id", getNoteByIdHandler);

// Validation
const validateNote = (note) => {
  const schema = joi.object({
    title: joi.string().required(),
    noteContent: joi.string().required(),
    id: joi.number(),
    lastUpdated: joi.date(),
  });
  return schema.validate(note);
};

//post: Making a new note
const saveNoteHandler = async (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(400).send(error);
  const id = await service.saveNote(req.body);
  res.status(200).send(`${id}`);
};
app.post("/notes", saveNoteHandler);

// Delete note by id
const deleteNoteByIdHandler = async (req, res) => {
  const id = parseInt(req.params["id"], 10);
  const noteDeleted = await service.deleteNoteById(id);
  if (noteDeleted) {
    res.status(200).send();
  } else {
    res.status(400).send("Bad request");
  }
};
app.delete("/notes/:id", deleteNoteByIdHandler);

export default app;
