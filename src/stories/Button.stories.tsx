// this is the Name.stories.jsx file
import React from 'react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button
// {...args}
/>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};