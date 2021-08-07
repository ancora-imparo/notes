import app from "./index";
import * as env from "./env";
import * as pg from "pg";
import { initialiseSQLTable } from "./service";
import path from "path";
import { logger as parentLogger } from "./logger";
const logger = parentLogger.child({ filename: path.basename(__filename) });

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
logger.debug("PG Pool initialized");

initialiseSQLTable();

const port = env.SERVER_PORT;
app.listen(port, () => logger.info(`Listening at port ${port} ...`));
