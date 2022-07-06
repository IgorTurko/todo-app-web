import * as C from '@chakra-ui/react';
import { useAsync } from 'react-async';
import { fetchNotes } from '../clients/api';
import NoteItem from './NoteItem';
import AlertBox from '../alert-box/AlertBox';

const NotesListingPage = () => {
  const { data, isPending, error } = useAsync({ promiseFn: fetchNotes });

  let content;
  if (error) {
    <AlertBox status="error">{`Failed to fetch notes: ${error.message}`}</AlertBox>;
  } else if (isPending) {
    content = <C.Spinner />;
  } else if (data) {
    content =
      data.length > 0 ? (
        <>
          <div>Notes:</div>
          <C.Stack pl={6} mt={1} spacing={1}>
            {data.map((note) => (
              <NoteItem id={note.id} text={note.text} checked={note.status === 'done'} />
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
