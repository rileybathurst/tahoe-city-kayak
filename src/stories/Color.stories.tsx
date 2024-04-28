// this is the Name.stories.tsx file
import React from 'react';
import { Color } from './Color';

export default {
  title: 'Color',
  component: Color,
};

const Template = (args) => <Color
// {...args}
/>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Color',
};