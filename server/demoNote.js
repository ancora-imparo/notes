const store = require("./store.js");

const demoNote = {
  id: 0,
  title: "Demo note",
  created: Date(),
  lastUpdated: Date(),
  noteContent: "Welcome, this is a demo note.",
};

module.exports = {
  makeDemoNote: async () => {
    const notes = await store.readNotes();
    notes.push(demoNote);
    await store.writeNotes(notes);
  },
};
