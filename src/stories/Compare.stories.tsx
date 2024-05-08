// this is the Name.stories.tsx file
import React from 'react';
import { Compare } from './Compare';

export default {
  title: 'Compare',
  component: Compare,
};

const Template = (args) => <Compare {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Compare',
};