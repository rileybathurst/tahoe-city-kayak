// this is the Name.stories.tsx file
import React from 'react';
import { Widths } from './Widths';

export default {
  title: 'Widths',
  component: Widths,
};

const Template = (args) => <Widths {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Widths',
};