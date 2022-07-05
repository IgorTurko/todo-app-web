import { fetchNotes } from './api';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('fetchNotes', () => {
  test('should return array of notes', async () => {
    const notes = [
      {
        id: 'abc',
        text: 'note abc',
        status: 'done',
      },
    ];

    localStorage.setItem('notes', JSON.stringify(notes));

    await expect(fetchNotes()).resolves.toEqual(notes);
  });

  test('should return error if invalid note in array', async () => {
    const notes = [
      {
        id: 'foo',
        text: 'note foo',
        status: 'bad_status',
      },
    ];

    localStorage.setItem('notes', JSON.stringify(notes));

    await expect(fetchNotes()).rejects.toEqual(new Error('Invalid note item in list'));
  });

  test('should return error if no array is returned', async () => {
    const notes = { name: 'Fail admin' };

    localStorage.setItem('notes', JSON.stringify(notes));

    await expect(fetchNotes()).rejects.toEqual(
      new Error("List notes API did not return anything or didn't return an array")
    );
  });
});
