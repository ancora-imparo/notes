const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

var store = require('json-fs-store')('/home/kartik/New Voume'); //path to store

const note0 = [
    {id: 0, title: "Demo note", created: Date(), lastUpdated: "some time", noteContent: "Welcome, this is a demo note."}
];
var length = 0;

store.add(note0, function(err) {
  if (err) throw err; // err if the save failed
});

app.get("/", (req, res) => {
    res.status(200).send();
});

// Get all notes
app.get("/notes", (req, res) => {
  store.list(function(err, objects) {
    if (err) throw err;
    res.send(objects);
  });
  });

// Get notes by id
app.get("/notes/:id", (req, res) => {
  store.load(req.params['id'], function(err, object){
  if(err) res.status(404).send() // err if JSON parsing failed
  res.send(object);

  });
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
  length++;
  const note = {
    id: length,
    title: req.body.title,
    created: Date(),
    lastUpdated : Date(),
    noteContent: req.body.noteContent,
  };
  
  store.add(note, function(err) {
    if (err) throw err; // err if the save failed
  });

  res.status(200).send();
});


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Listening at port ${port} ...`));
