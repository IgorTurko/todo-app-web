import { isRight } from 'fp-ts/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

const DEFAULT_NOTES = [
  { id: 'foo', text: 'foo', status: 'pending' },
  { id: 'faa', text: 'faa', status: 'pending' },
  { id: 'foo2', text: 'foo2', status: 'done' },
];

export const NoteItem = t.type({
  id: t.string,
  text: t.string,
  status: t.union([t.literal('pending'), t.literal('done')]),
});

export type NoteItemType = t.TypeOf<typeof NoteItem>;

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
