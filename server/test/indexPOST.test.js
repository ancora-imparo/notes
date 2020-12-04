const got = require("got");

test("Create a valid POST request", async () => {
  const { body } = await got.post(`http://localhost:5000/notes`, {
    json: {
      title: "First",
      noteContent: "This is First note",
    },
    responseType: "json",
  });

  const response = await got(`http://localhost:5000/notes`).json();
  console.log(response);
});
