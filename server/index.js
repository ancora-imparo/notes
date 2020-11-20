const express = require("express");
const Joi = require("joi");
const app = express();
const store = require("./store.js");
app.use(express.json());

demoNote = {
  id: 0,
  title: "Demo note",
  created: Date(),
  lastUpdated: "some time",
  noteContent: "Welcome, this is a demo note.",
};

(async () => {
  const notes = await store.readNotes();
  notes.push(demoNote);
  await store.writeNotes(notes);
})();

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
  const id = parseInt(req.params["id"]);

  let note = notes.filter(function (element) {
    if (element.id === id) {
      return true;
    } else {
      return false;
    }
  });
  if (!Array.isArray(note) || !note.length) {
    res.status(404).send("Not Found");
  }
  res.status(200).send(note);
});

// Validation
function validatenote(note) {
  const schema = Joi.object({
    title: Joi.string().required(),
    noteContent: Joi.string().required(),
  });
  return schema.validate(note);
}

//post: Making a new note
app.post("/notes", async (req, res) => {
  const { error } = validatenote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const notes = await store.readNotes();

  const note = {
    id: notes.length + 1,
    title: req.body.title,
    created: Date(),
    lastUpdated: Date(),
    noteContent: req.body.noteContent,
  };

  notes.push(note);
  await store.writeNotes(notes);

  res.status(200).send();
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
