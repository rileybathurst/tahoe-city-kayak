import React from 'react';
import { Simple } from './Simple';

export default {
  title: 'Simple',
  component: Simple,
};

const Template = (args) => <Simple {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Simple',
};