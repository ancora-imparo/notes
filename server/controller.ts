import joi from "joi";
import { Request, Response } from "express";

import * as service from "./service";
import { logger } from "./index";

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
  logger.debug(req.params, "controller, getNoteById, req.params");

  const id = req.params.id;
  const note = await service.getNoteById(id);
  if (!note) {
    res.status(404).send("Not Found");
  } else {
    logger.debug(note, "controller, getNoteById, res, note");
    res.status(200).send(note);
  }
};

const validateNote = (note) => {
  const schema = joi.object({
    title: joi.string().required(),
    noteContent: joi.string().required(),
    id: joi.string(),
  });
  return schema.validate(note);
};

export const saveNote = async (req: Request, res: Response): Promise<void> => {
  logger.debug(req, "controller, saveNote, req");
  const { body } = req;
  const { error } = validateNote(body);
  if (error) res.status(400).send(error);
  else {
    const id = await service.saveNote(body);
    logger.debug(id, "controller, saveNote, res, id");
    res.status(200).send(id);
  }
};

export const deleteNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.debug(req.params, "deleteNoteById, req.params");
  const id = req.params.id;
  const noteDeleted = await service.deleteNoteById(id);
  if (noteDeleted) {
    logger.debug("controller, deleteNoteById, res 200");
    res.status(200).send();
  } else {
    res.status(400).send("Bad request");
  }
};
