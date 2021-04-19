const appPort = require("./index");
const env = require("./env");

const port = env.SERVER_PORT;
appPort.listen(port, () => console.log(`Listening at port ${port} ...`));
