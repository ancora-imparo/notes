import Pino from "pino";

import * as env from "./env";
import _ from "lodash";

export const logger = Pino({
  level: env.LOG_LEVEL || "info",
  prettyPrint: {
    colorize: true,
    messageFormat: env.LOG_MESSAGE_FORMAT,
    translateTime: env.LOG_TIME_FORMAT,
    ignore: env.LOG_IGNORE,
  },
});
