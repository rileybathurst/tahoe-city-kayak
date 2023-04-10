// this is the Name.stories.jsx file
import React from 'react';
import { Deck } from './Deck';

export default {
  title: 'Deck',
  component: Deck,
};

const Template = (args) => <Deck {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Deck',
};