import joi from "joi";
import { Request, Response } from "express";

import * as service from "./service";

export const getHealthCheck = (_: Request, res: Response): void => {
  res.status(200).send();
};

export const getAllNotes = async (_: Request, res: Response): Promise<void> => {
  const notes = await service.getAllNotes();
  res.status(200).send(notes);
};

export const getNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params["id"];
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
    id: joi.string(),
    lastUpdated: joi.date(),
  });
  return schema.validate(note);
};

export const saveNote = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  const { error } = validateNote(body);
  if (error) res.status(400).send(error);
  else {
    const id = await service.saveNote(body);
    res.status(200).send(id);
  }
};

export const deleteNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params["id"];
  const noteDeleted = await service.deleteNoteById(id);
  if (noteDeleted) {
    res.status(200).send();
  } else {
    res.status(400).send("Bad request");
  }
};
