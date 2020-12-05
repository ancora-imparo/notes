const request = require("supertest");
const app = require("../index");

describe("http requests testing", () => {
  test("Initial GET request", () => {
    return request(app)
      .get("/notes")
      .then((response) => {
        expect(response.statusCode).toBe(200);

        noteJson = response.body;
        expect(noteJson).toStrictEqual([]);
      });
  });
  test("Initial POST request", () => {
    return request(app)
      .post("/notes")
      .send({
        title: "1st",
        noteContent: "This is First note",
      })
      .expect(200);
  });

  test("GET request after POST", () => {
    return request(app)
      .get("/notes")
      .then((response) => {
        expect(response.statusCode).toStrictEqual(200);
        noteJson = response.body;
        expect(noteJson.length).toStrictEqual(1);
        expect(noteJson[0].title).toBe("1st");
        expect(noteJson[0].noteContent).toBe("This is First note");
      });
  });

  test("POST request for second note", () => {
    return request(app)
      .post("/notes")
      .send({
        title: "2nd",
        noteContent: "This is Second note",
      })
      .expect(200);
  });

  test("GET request after second note is added", () => {
    return request(app)
      .get("/notes")
      .then((response) => {
        expect(response.statusCode).toStrictEqual(200);
        noteJson = response.body;
        expect(noteJson.length).toStrictEqual(2);
        expect(noteJson[1].title).toBe("2nd");
        expect(noteJson[1].noteContent).toBe("This is Second note");
      });
  });

  test("GET request of second note by id", () => {
    return request(app)
      .get("/notes/2")
      .then((response) => {
        expect(response.statusCode).toStrictEqual(200);
        noteJson = response.body;
        expect(noteJson.title).toBe("2nd");
        expect(noteJson.noteContent).toBe("This is Second note");
      });
  });

  test("GET request by id to get 404 response", () => {
    return request(app)
      .get("/notes/99")
      .catch((err) => {
        expect(err.response.statusCode).toStrictEqual(404);
      });
  });
});
