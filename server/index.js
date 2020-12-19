const express = require("express");
const app = express();
const Joi = require("joi");
var cors = require("cors");
app.use(cors());
const store = require("./store.js");
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send();
});
​
// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await store.readNotes();
  res.status(200).send(notes);
});
​
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
​
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
​
//post: Making a new note
app.post("/notes", async (req, res) => {
  const { error } = validatenote(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const notes = await store.readNotes();
  const note = {
    id: req.body.id,
    title: req.body.title,
    created: Date(),
    lastUpdated: Date(),
    noteContent: req.body.noteContent,
  };
​
  if (req.body.id === 0) {
    note.id = Math.max(0, ...notes.map((item) => item.id)) + 1;
    notes.push(note);
    await store.writeNotes(notes);
  } else {
    const newNotes = notes.map((element) =>
      element.id === note.id
        ? {
            ...element,
            title: req.body.title,
            lastUpdated: Date(),
            noteContent: req.body.noteContent,
          }
        : element
    );
    await store.writeNotes(newNotes);
  }
​
  res.status(200).send();
});
​
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
​
module.exports = app;