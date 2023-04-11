import React from 'react';
import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Card',
  emoji: '👋',
};
