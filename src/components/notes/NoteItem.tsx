import * as C from '@chakra-ui/react';
import { useAsync } from 'react-async';
import { changeNoteStatus, NoteStatusType, NoteItemType as NoteType } from '../clients/api';
import { showErrorToast } from '../helpers';

interface NoteItemType {
  id: string;
  text: string;
  status: NoteStatusType;
  onChange: (note: NoteType) => void;
}

const NoteItem = (props: NoteItemType) => {
  const { id, text, status, onChange } = props;

  const { run, isPending } = useAsync({
    deferFn: async (params) => {
      try {
        const id = params[0];
        const status = params[1];
        const note = await changeNoteStatus(id, status);
        onChange(note);
      } catch (e) {
        showErrorToast('Failed update note status', 'Error');
      }
    },
  });

  return (
    <C.HStack spacing={[2, 4]}>
      {isPending ? (
        <C.Spinner></C.Spinner>
      ) : (
        <C.Checkbox
          size="lg"
          name={id}
          isChecked={status === 'done'}
          onChange={(e) => run(id, e.target.checked ? 'done' : 'pending')}></C.Checkbox>
      )}
      <C.Text fontSize="lg">{text}</C.Text>
    </C.HStack>
  );
};

export default NoteItem;
