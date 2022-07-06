import { isRight } from 'fp-ts/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

const DEFAULT_NOTES = [
  { id: 'foo', text: 'foo', status: 'pending' },
  { id: 'faa', text: 'faa', status: 'pending' },
  { id: 'foo2', text: 'foo2', status: 'done' },
];

const NoteStatus = t.union([t.literal('pending'), t.literal('done')]);

export const NoteItem = t.type({
  id: t.string,
  text: t.string,
  status: NoteStatus,
});

export type NoteItemType = t.TypeOf<typeof NoteItem>;
type NoteStatusType = t.TypeOf<typeof NoteStatus>;

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function fetchNotesFromLocalStorage(): Promise<NoteItemType[]> {
  // pretending it's a http request
  await delay(1000);

  const notes = localStorage.getItem('notes');

  if (!notes) {
    localStorage.setItem('notes', JSON.stringify(DEFAULT_NOTES));
  }

  // @ts-ignore: local storage should have been initialized before
  return JSON.parse(localStorage.getItem('notes'));
}

export async function fetchNotes(): Promise<NoteItemType[]> {
  const notes = await fetchNotesFromLocalStorage();

  if (!Array.isArray(notes)) {
    throw new Error("List notes API did not return anything or didn't return an array");
  }

  const notesDecoded = notes.map((a) => {
    const ret = NoteItem.decode(a);
    if (!isRight(ret)) {
      console.error('Invalid note item in list:', PathReporter.report(ret));
      throw new Error('Invalid note item in list');
    }

    return ret.right;
  });

  return notesDecoded;
}

export async function changeNoteStatus(
  noteId: string,
  newStatus: NoteStatusType
): Promise<NoteItemType> {
  const notes = await fetchNotes();
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    throw new Error('Note not found');
  }

  if (note.status === newStatus) {
    throw new Error('New note status must be different from the old');
  }

  note.status = newStatus;

  localStorage.setItem('notes', JSON.stringify(notes));

  return note;
}
