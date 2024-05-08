// this is the Name.stories.tsx file
import React from 'react';
import { Neutrals } from './Neutrals';

export default {
  title: 'Neutrals',
  component: Neutrals,
};

const Template = (args) => <Neutrals {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Neutrals',
};