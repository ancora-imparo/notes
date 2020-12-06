const request = require("supertest");
const app = require("../index");

describe("http requests testing", () => {
  test("Initial GET request", async () => {
    const response = await request(app).get("/notes");
    expect(response.statusCode).toBe(200);

    noteJson = response.body;
    expect(noteJson).toStrictEqual([]);
  });
});
test("Initial POST request", async () => {
  const response = await request(app).post("/notes").send({
    title: "1st",
    noteContent: "This is First note",
  });
  expect(response.statusCode).toBe(200);
});

test("GET request after POST", async () => {
  const response = await request(app).get("/notes");
  expect(response.statusCode).toStrictEqual(200);
  noteJson = response.body;
  expect(noteJson.length).toStrictEqual(1);
  expect(noteJson[0].title).toBe("1st");
  expect(noteJson[0].noteContent).toBe("This is First note");
});

test("POST request for second note", async () => {
  const response = await request(app).post("/notes").send({
    title: "2nd",
    noteContent: "This is Second note",
  });
  expect(response.statusCode).toBe(200);
});

test("GET request after second note is added", async () => {
  const response = await request(app).get("/notes");
  expect(response.statusCode).toStrictEqual(200);
  noteJson = response.body;
  expect(noteJson.length).toStrictEqual(2);
  expect(noteJson[1].title).toBe("2nd");
  expect(noteJson[1].noteContent).toBe("This is Second note");
});

test("GET request of second note by id", async () => {
  const response = await request(app).get("/notes/2");
  expect(response.statusCode).toStrictEqual(200);
  noteJson = response.body;
  expect(noteJson.title).toBe("2nd");
  expect(noteJson.noteContent).toBe("This is Second note");
});

test("GET request by id to get 404 response", async () => {
  const response = await request(app).get("/notes/99");
  expect(response.statusCode).toStrictEqual(404);
});
