const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());


const notes = [
    {id: 0, Title: "Demo note", Created: Date(), LastUpdated: "some time", Note: "Welcome, this is a demo note."}
];

app.get("/", (req, res) => {
    res.send("Welcome to Notes app.")
});

// Get all notes
app.get("/notes", (req, res) => {
    res.send(notes);
});

// Get notes by id
app.get("/notes/:id", (req, res) => {
  const note = notes.find((c) => c.id === parseInt(req.params.id));
  if (!note) res.status(404).send("Not Found");
  res.send(note);
});

// Validation
function validateNote(note) {
    const schema = Joi.object({
      Title: Joi.string().min(1).required(),
      Note : Joi.string().required()
    })
    return schema.validate(note);
  }

//post: Making a new Note
app.post("/notes", (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const note = {
    id: notes.length + 1,
    Title: req.body.Title,
    Created: Date(),
    LastUpdated : Date(),
    Note: req.body.Note,
  };
  notes.push(note);
  res.send(note);
});


const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening at port ${port} ...`));
