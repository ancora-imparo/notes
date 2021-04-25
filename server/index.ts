import express from "express";
import joi from "joi";
import cors from "cors";
import _ from "lodash";

import * as store from "./store";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send();
});

// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await store.readNotes();
  res.status(200).send(notes);
});

// Get notes by id
app.get("/notes/:id", async (req, res) => {
  const notes = await store.readNotes();
  const id = parseInt(req.params["id"], 10);
  const note = notes.find((element) => element.id === id);
  if (!note) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).send(note);
  }
});

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
app.post("/notes", async (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(400).send(error);
  const notes = await store.readNotes();
  const noteIndex = _.findIndex(notes, (n) => n.id === req.body.id);
  if (noteIndex >= 0) {
    notes[noteIndex] = { ...notes[noteIndex], ...req.body };
  } else {
    req.body.id = Math.max(0, ...notes.map((item) => item.id)) + 1;
    const note = {
      id: req.body.id,
      title: req.body.title,
      created: Date(),
      lastUpdated: Date(),
      noteContent: req.body.noteContent,
    };
    notes.push(note);
  }
  await store.writeNotes(notes);
  res.status(200).send(`${req.body.id}`);
});

// Delete note by id
app.delete("/notes/:id", async (req, res) => {
  const notes = await store.readNotes();
  const id = parseInt(req.params["id"], 10);
  const noteExist = notes.find((element) => element.id === id);
  if (noteExist) {
    const updatedNotes = notes.filter((element) => {
      return element.id !== id;
    });
    await store.writeNotes(updatedNotes);
    res.status(200).send();
  } else {
    res.status(400).send("Bad request");
  }
});

export default app;
