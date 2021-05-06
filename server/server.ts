import app from "./index";
import * as env from "./env";
import * as pg from "pg";
import { initialiseSQLTable } from "./service";

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

initialiseSQLTable();
const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
