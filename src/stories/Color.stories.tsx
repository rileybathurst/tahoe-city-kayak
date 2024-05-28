// this is the Name.stories.tsx file
import React from 'react';
import { Color } from './Color';

export default {
  title: 'Color',
  component: Color,
};

interface TemplateTypes {
  primary: boolean;
  label: string;
  args: {
    primary: boolean;
    label: string;
  }
}
const Template = (args: TemplateTypes): JSX.Element => <Color
// {...args}
/>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Color',
} as TemplateTypes['args']; // Add 'as TemplateTypes['args']' to fix the problem.
