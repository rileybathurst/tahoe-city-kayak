// this is the Name.stories.jsx file
import React from 'react';
import { Args } from './Args';

export default {
  title: 'Args',
  component: Args,
};

const Template = (args) => <Args {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: '🍔',
};