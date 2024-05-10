// this is the Name.stories.tsx file
import React from 'react';
import { Eyebrow } from './Eyebrow';

export default {
  title: 'Eyebrow',
  component: Eyebrow,
};

const Template = (args) => <Eyebrow {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Eyebrow',
};