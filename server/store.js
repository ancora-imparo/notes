const FsPromise = require("fs").promises;

module.exports = {
  readNotes: async function (filepath = "./data.json") {
    const notes = await FsPromise.readFile(filepath);
    return JSON.parse(notes);
  },

  writeNotes: async function (notesObj, filepath = "./data.json") {
    await FsPromise.writeFile(filepath, JSON.stringify(notesObj));
  },
};
