const FsPromise = require("fs").promises;

export const readNotes = async (filepath = "./data.json"): Promise<Note[]> => {
  try {
    const notes: string = await FsPromise.readFile(filepath);
    return JSON.parse(notes);
  } catch (error) {
    return [];
  }
};

export const writeNotes = async (
  notesObj: Note[],
  filepath = "./data.json"
): Promise<void> => {
  await FsPromise.writeFile(filepath, JSON.stringify(notesObj));
};
