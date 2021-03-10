const express = require("express");
const Joi = require("joi");
const cors = require("cors");
const _ = require("lodash");

const store = require("./store.js");
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
function validatenote(note) {
  const schema = Joi.object({
    title: Joi.string().required(),
    noteContent: Joi.string().required(),
    id: Joi.number(),
    lastUpdated: Joi.date(),
  });
  return schema.validate(note);
}

//post: Making a new note
app.post("/notes", async (req, res) => {
  const { error } = validatenote(req.body);

  const errorDetails = _.get(error, "details", "Error in validation");
  const errorMessages = _.map(errorDetails, (e) =>
    _.get(e, "message", "Eror message not found")
  );
  if (error) return res.status(400).send(errorMessages);
  const notes = await store.readNotes();
  const noteIndex = _.findIndex(notes, (n) => n.id === req.body.id);
  if (noteIndex >= 0) {
    notes[noteIndex] = { ...notes[noteIndex], ...req.body };
  } else {
    const note = {
      id: Math.max(0, ...notes.map((item) => item.id)) + 1,
      title: req.body.title,
      created: Date(),
      lastUpdated: Date(),
      noteContent: req.body.noteContent,
    };
    notes.push(note);
  }

  await store.writeNotes(notes);
  res.status(200).send();
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

module.exports = app;
