const FsPromise = require("fs").promises;

module.exports = {
  readNotes: async function (filepath: string = "./data.json") {
    try {
      const notes: string = await FsPromise.readFile(filepath);
      return JSON.parse(notes);
    } catch (error) {
      return [];
    }
  },

  writeNotes: async function (
    notesObj: notesObject,
    filepath: string = "./data.json"
  ) {
    await FsPromise.writeFile(filepath, JSON.stringify(notesObj));
  },
};
