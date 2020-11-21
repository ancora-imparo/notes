const FsPromise = require("fs").promises;

module.exports = {
  readNotes: async function (filepath = "./data.json") {
    try {
      const notes = await FsPromise.readFile(filepath);
      return JSON.parse(notes);
    } catch (error) {
      return [];
    }
  },

  writeNotes: async function (notesObj, filepath = "./data.json") {
    await FsPromise.writeFile(filepath, JSON.stringify(notesObj));
  },
};
