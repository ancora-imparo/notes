const got = require("got");

describe("http requests testing", () => {
  test("Create a valid GET request", async () => {
    const response = await got(`http://localhost:5000/notes`).json();
    expect(response).toStrictEqual([]);
  });

  test("Create a valid POST request", async () => {
    const { body } = await got.post(`http://localhost:5000/notes`, {
      json: {
        title: "First",
        noteContent: "This is First note",
      },
    });

    const response = await got(`http://localhost:5000/notes`).json();
    expect(response).toHaveLength(1);
  });
});
