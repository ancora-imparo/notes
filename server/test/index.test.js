const got = require("got");
const { func } = require("joi");
const app = require("../app");

describe("http requests testing", () => {
  test("Initial GET request", async () => {
    const response = await got(`http://localhost:5000/notes`);
    expect(response.statusCode).toStrictEqual(200);
    noteJson = JSON.parse(response.body);
    expect(noteJson).toStrictEqual([]);
  });

  test("Initial POST request", async () => {
    const body = await got.post(`http://localhost:5000/notes`, {
      json: {
        title: "1st",
        noteContent: "This is First note",
      },
    });
    expect(body.statusCode).toStrictEqual(200);
  });

  test("GET request after POST", async () => {
    const response = await got(`http://localhost:5000/notes`);
    expect(response.statusCode).toStrictEqual(200);
    noteJson = JSON.parse(response.body);
    expect(noteJson.length).toStrictEqual(1);
    expect(noteJson[0].title).toBe("1st");
    expect(noteJson[0].noteContent).toBe("This is First note");
  });

  test("POST request for second note", async () => {
    const body = await got.post(`http://localhost:5000/notes`, {
      json: {
        title: "2nd",
        noteContent: "This is Second note",
      },
    });
    expect(body.statusCode).toStrictEqual(200);
  });

  test("GET request after second note is added", async () => {
    const response = await got(`http://localhost:5000/notes`);
    expect(response.statusCode).toStrictEqual(200);
    noteJson = JSON.parse(response.body);
    expect(noteJson.length).toStrictEqual(2);
    expect(noteJson[1].title).toBe("2nd");
    expect(noteJson[1].noteContent).toBe("This is Second note");
  });

  test("GET request of second note by id", async () => {
    const response = await got(`http://localhost:5000/notes/2`);
    expect(response.statusCode).toStrictEqual(200);
    noteJson = JSON.parse(response.body);
    expect(noteJson.title).toBe("2nd");
    expect(noteJson.noteContent).toBe("This is Second note");
  });

  test("GET request by id to get 404 response", async () => {
    const response = await got(`http://localhost:5000/notes/99`).catch(
      (err) => {
        expect(err.response.statusCode).toStrictEqual(404);
      }
    );
  });
});
