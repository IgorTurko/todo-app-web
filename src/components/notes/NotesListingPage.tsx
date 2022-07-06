import * as C from '@chakra-ui/react';
import { useAsync } from 'react-async';
import { fetchNotes } from '../clients/api';

const NotesListingPage = () => {
  const { data, isPending, error } = useAsync({ promiseFn: fetchNotes });

  let content;
  if (error) {
    console.error('Something went wrong', error);
  } else if (isPending) {
    content = <C.Spinner />;
  } else if (data) {
    content =
      data.length > 0 ? (
        <>
          <div>Notes:</div>
          <C.Stack pl={6} mt={1} spacing={1}>
            {data.map((note) => (
              <div>{note.text}</div>
            ))}
          </C.Stack>
        </>
      ) : (
        <div>Notes were not found</div>
      );
  }

  return (
    <C.Container bg="gray.600" h="calc(100vh - 4rem)">
      {content}
    </C.Container>
  );
};

export default NotesListingPage;
