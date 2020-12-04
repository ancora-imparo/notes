const got = require("got");
const app = require("../app");

describe("http requests testing", () => {
  test("Initial GET request", async () => {
    const response = await got(`http://localhost:5000/notes`).json();
    expect(response).toStrictEqual([]);
  });

  test("Initial POST request", async () => {
    const { body } = await got.post(`http://localhost:5000/notes`, {
      json: {
        title: "First",
        noteContent: "This is First note",
      },
    });
  });

  test("GET request after POST", async () => {
    const response = await got(`http://localhost:5000/notes`).json();
    expect(response).toHaveLength(1);
  });

  test("POST request for second note", async () => {
    const { body } = await got.post(`http://localhost:5000/notes`, {
      json: {
        title: "First",
        noteContent: "This is First note",
      },
    });
  });

  test("GET request after second note is added", async () => {
    const response = await got(`http://localhost:5000/notes`).json();
    expect(response).toHaveLength(2);
  });
});
