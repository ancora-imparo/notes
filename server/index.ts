import express from "express";
import expressPino from "express-pino-logger";
import cors from "cors";

import * as controller from "./controller";
import { logger } from "./logger";
import StackTrace from "stacktrace-js";
import { get } from "lodash";

const app = express();
const expressLogger = expressPino({ logger });
app.use(expressLogger);
app.use(cors());
app.use(express.json());

logger.debug(
  `${get(
    StackTrace.getSync(),
    "[0].source",
    StackTrace.getSync()
  )} : Express app initialized`
);

app.get("/", controller.getHealthCheck);

// Get all notes
app.get("/notes", controller.getAllNotes);

// Get notes by id
app.get("/notes/:id", controller.getNoteById);

//Post: Making a new note
app.post("/notes", controller.saveNote);

// Delete note by id
app.delete("/notes/:id", controller.deleteNoteById);

export default app;
