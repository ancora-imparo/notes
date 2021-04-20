const app = require("./index");
const env = require("./env");

interface Note {
  id: number;
  title: string;
  created: string;
  lastUpdated: string;
  noteContent: string;
}
const port = env.SERVER_PORT;
app.listen(port, () => console.log(`Listening at port ${port} ...`));
