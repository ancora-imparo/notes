import request from "supertest";

import app from "../index";
import pool from "../db";

(async () => {
  // Wait 10 seconds
  await new Promise((res) => setTimeout(res, 10000));
  const client = await pool.connect();
  await client.query(
    `CREATE TABLE IF NOT EXISTS notes(id UUID PRIMARY KEY, title VARCHAR(32) NOT NULL, "noteContent" TEXT NOT NULL, created TIMESTAMPTZ, "lastUpdated" TIMESTAMPTZ);CREATE UNIQUE INDEX IF NOT EXISTS index ON notes(id);`
  );
  client.release(true);
})();

describe("http requests testing", () => {
  let secondId;
  test("Initial GET request", async () => {
    const response = await request(app).get("/notes");
    expect(response.statusCode).toBe(200);

    const noteJson: Note[] = response.body;
    expect(noteJson).toStrictEqual([]);
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
    const noteJson: Note[] = response.body;
    expect(noteJson.length).toStrictEqual(1);
    expect(noteJson[0].title).toBe("1st");
    expect(noteJson[0].noteContent).toBe("This is First note");
  });

  test("POST request for second note", async () => {
    const response = await request(app).post("/notes").send({
      title: "2nd",
      noteContent: "This is Second note",
    });
    secondId = response.text;
    expect(response.statusCode).toBe(200);
  });

  test("GET request after second note is added", async () => {
    const response = await request(app).get("/notes");
    expect(response.statusCode).toStrictEqual(200);
    const noteJson: Note[] = response.body;
    expect(noteJson.length).toStrictEqual(2);
    expect(noteJson[1].title).toBe("2nd");
    expect(noteJson[1].noteContent).toBe("This is Second note");
  });

  test("GET request of second note by id", async () => {
    const response = await request(app).get(`/notes/${secondId}`);
    expect(response.statusCode).toStrictEqual(200);
    const noteJson: Note = response.body;
    expect(noteJson.title).toBe("2nd");
    expect(noteJson.noteContent).toBe("This is Second note");
  });

  test("GET request by a random id to get 404 response", async () => {
    const response = await request(app).get(
      "/notes/c61f1fc9-e0d2-43ce-a6c1-b5436cdebe7d"
    );
    expect(response.statusCode).toStrictEqual(404);
  });

  test("DELETE request of second note by id", async () => {
    const response = await request(app).delete(`/notes/${secondId}`);
    expect(response.statusCode).toStrictEqual(200);
  });
  test("GET request of deleted second note", async () => {
    const response = await request(app).get(`/notes/${secondId}`);
    expect(response.statusCode).toStrictEqual(404);
  });
  test("DELETE request to get bad request response", async () => {
    const response = await request(app).delete(
      "/notes/c61f1fc9-e0d2-43ce-a6c1-b5436cdebe7d"
    );
    expect(response.statusCode).toStrictEqual(400);
  });
});
