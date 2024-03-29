import React from 'react';
import { Link } from './Link';

export default {
  title: 'Link',
  component: Link,
};

const Template = (args) => <Link {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Link',
};

export const Hover = Template.bind({});
Hover.args = {
  label: 'Hover',
};
