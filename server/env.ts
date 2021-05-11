import dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT =
  process.env.PORT || process.env.SERVER_PORT || "5000";
export const DATABASE_URL = process.env.DATABASE_URL;
