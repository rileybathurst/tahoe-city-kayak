import React from 'react';
import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
};

const Template = (card) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.card = {
  primary: true,
  label: 'Card',
  emoji: '👋',
};
