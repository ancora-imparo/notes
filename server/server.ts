import app from "./index";
import * as env from "./env";
import * as pg from "pg";
import { initialiseSQLTable } from "./service";
import { logger } from "./logger";
import { get } from "lodash";
import StackTrace from "stacktrace-js";

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
logger.debug(
  `${get(
    StackTrace.getSync(),
    "[0].source",
    StackTrace.getSync()
  )} : PG Pool initialized`
);

initialiseSQLTable();

const port = env.SERVER_PORT;
app.listen(port, () =>
  logger.info(
    `${get(
      StackTrace.getSync(),
      "[0].source",
      StackTrace.getSync()
    )} : Listening at port ${port} ...`
  )
);
