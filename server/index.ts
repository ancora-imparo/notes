import express from "express";
import Pino from "pino";
import expressPino from "express-pino-logger";
import cors from "cors";

import * as controller from "./controller";

export const logger = Pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: {
    colorize: true,
    translateTime: "yyyy-mm-dd HH:MM:ss",
    ignore: "pid,hostname",
  },
});

const app = express();
const expressLogger = expressPino({ logger });
app.use(expressLogger);
app.use(cors());
app.use(express.json());
logger.debug("Express app initialized");

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
