import app, { logger } from "./index";
import * as env from "./env";
import * as pg from "pg";
import { initialiseSQLTable } from "./service";

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
logger.debug("PG Pool initialized");

initialiseSQLTable();
logger.debug("SQL table initialized");

const port = env.SERVER_PORT;
app.listen(port, () => logger.info(`Listening at port ${port} ...`));
