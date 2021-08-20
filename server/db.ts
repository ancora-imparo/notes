import * as pg from "pg";
import * as env from "./env";

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
