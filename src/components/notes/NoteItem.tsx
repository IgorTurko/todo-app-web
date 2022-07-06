import * as C from '@chakra-ui/react';

interface NoteItemType {
  id: string;
  text: string;
  checked: boolean;
}

const NoteItem = (props: NoteItemType) => {
  const { id, text, checked } = props;

  return (
    <C.Checkbox size="lg" name={id} checked={checked}>
      {text}
    </C.Checkbox>
  );
};

export default NoteItem;
