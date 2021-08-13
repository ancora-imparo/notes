import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT =
  process.env.PORT || process.env.SERVER_PORT || "5000";
export const DATABASE_URL = process.env.DATABASE_URL;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const LOG_MESSAGE_FORMAT = process.env.LOG_MESSAGE_FORMAT;
export const LOG_TIME_FORMAT = process.env.LOG_TIME_FORMAT;
export const LOG_IGNORE = process.env.LOG_IGNORE;
