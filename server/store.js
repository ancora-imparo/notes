const FsPromise = require("fs").promises;

module.exports = {
  readNotes: async function (fp = "./data.json") {
    const notes = await FsPromise.readFile(fp);
    return JSON.parse(notes);
  },

  writeNotes: async function (notesObj, fp = "./data.json") {
    await FsPromise.writeFile(fp, JSON.stringify(notesObj));
  },
};
