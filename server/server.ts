const app = require("./index");
const env = require("./env");

const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
