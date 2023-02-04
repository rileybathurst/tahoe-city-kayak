// this is the Name.stories.jsx file
import React from 'react';
import { Backgrounds } from './Backgrounds';

export default {
  title: 'Backgrounds',
  component: Backgrounds,
};

const Template = (args) => <Backgrounds {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Backgrounds',
};