const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());


const notes = [
    {id: 0, title: "Demo note", created: Date(), lastUpdated: "some time", noteContent: "Welcome, this is a demo note."}
];

app.get("/", (req, res) => {
    res.status(200).send();
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
function validatenote(note) {
    const schema = Joi.object({
      title: Joi.string().required(),
      noteContent : Joi.string().required()
    })
    return schema.validate(note);
  }

//post: Making a new note
app.post("/notes", (req, res) => {
  const { error } = validatenote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const note = {
    id: notes.length + 1,
    title: req.body.title,
    created: Date(),
    lastUpdated : Date(),
    noteContent: req.body.noteContent,
  };
  notes.push(note);
  res.status(200).send();
});


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Listening at port ${port} ...`));
