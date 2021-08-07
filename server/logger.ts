import Pino from "pino";
import path from "path";

export const logger = Pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: {
    colorize: true,
    messageFormat: "{filename}: {msg}",
    translateTime: "yyyy-mm-dd HH:MM:ss",
    ignore: "pid,hostname,filename",
  },
}).child({ filename: path.basename(__filename) });
