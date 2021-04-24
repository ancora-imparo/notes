import joi from "joi";

import * as service from "./service";

export const getHealthCheck = (_, res): void => {
  res.status(200).send();
};
export const getAllNotesHandler = async (_, res): Promise<void> => {
  const notes = await service.getAllNotes();
  res.status(200).send(notes);
};

export const getNoteByIdHandler = async (req, res): Promise<void> => {
  const id = parseInt(req.params["id"], 10);
  const note = await service.getNoteById(id);
  if (!note) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).send(note);
  }
};
const validateNote = (note) => {
  const schema = joi.object({
    title: joi.string().required(),
    noteContent: joi.string().required(),
    id: joi.number(),
    lastUpdated: joi.date(),
  });
  return schema.validate(note);
};
export const saveNoteHandler = async ({ body }, res): Promise<void> => {
  const { error } = validateNote(body);
  if (error) res.status(400).send(error);
  else {
    const id = await service.saveNote(body);
    res.status(200).send(id.toString());
  }
};
export const deleteNoteByIdHandler = async (req, res): Promise<void> => {
  const id = parseInt(req.params["id"], 10);
  const noteDeleted = await service.deleteNoteById(id);
  if (noteDeleted) {
    res.status(200).send();
  } else {
    res.status(400).send("Bad request");
  }
};
