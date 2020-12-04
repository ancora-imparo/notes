const got = require("got");

test("Create a valid GET request", async () => {
  const response = await got(`http://localhost:5000/notes`).json();
  console.log(response);
});
