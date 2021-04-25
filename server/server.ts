import app from "./index";
import * as env from "./env";

const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
