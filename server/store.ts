import { readFile, writeFile } from "fs/promises";

export const readNotes = async (filepath = "./data.json"): Promise<Note[]> => {
  try {
    const notes = await readFile(filepath);
    return JSON.parse(notes.toString());
  } catch (error) {
    return [];
  }
};

export const writeNotes = async (
  notesObj: Note[],
  filepath = "./data.json"
): Promise<void> => {
  await writeFile(filepath, JSON.stringify(notesObj));
};
