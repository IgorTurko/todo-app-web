import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import NoteItem from './NoteItem';

export default {
  title: 'NoteItem',
  component: NoteItem,
} as Meta;

const Template: Story<ComponentProps<typeof NoteItem>> = (args) => (
  <NoteItem {...args}>This is an NoteItem</NoteItem>
);

export const NoteItemStory = Template.bind({});
NoteItemStory.args = { id: 'foo', text: 'Text 1', status: 'pending' };
