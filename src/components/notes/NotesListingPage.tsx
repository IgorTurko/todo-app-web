import * as C from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-async';
import { fetchNotes, NoteItemType } from '../clients/api';
import NoteItem from './NoteItem';
import AlertBox from '../alert-box/AlertBox';

const NotesListingPage = () => {
  const { data, isPending, error } = useAsync({ promiseFn: fetchNotes });
  const [notes, setNotes] = useState<NoteItemType[] | undefined>(undefined);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  let content;
  if (error) {
    <AlertBox status="error">{`Failed to fetch notes: ${error.message}`}</AlertBox>;
  } else if (isPending) {
    content = <C.Spinner />;
  } else if (notes) {
    content =
      notes.length > 0 ? (
        <>
          <div>Notes:</div>
          <C.Stack pl={6} mt={1} spacing={1}>
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                text={note.text}
                status={note.status}
                onChange={(newNote) => {
                  const newNotes = notes.map((note) => (note.id === newNote.id ? newNote : note));
                  setNotes(newNotes);
                }}
              />
            ))}
          </C.Stack>
        </>
      ) : (
        <AlertBox status="info">Notes were not found</AlertBox>
      );
  }

  return (
    <C.Container bg="gray.600" h="calc(100vh - 4rem)">
      {content}
    </C.Container>
  );
};

export default NotesListingPage;
