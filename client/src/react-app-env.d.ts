/// <reference types="react-scripts" />
interface Note {
  id: string;
  title: string;
  created: string;
  lastUpdated: string;
  noteContent: string;
}

type makeOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type DraftNote = makeOptional<Note, "id" | "lastUpdated">;
