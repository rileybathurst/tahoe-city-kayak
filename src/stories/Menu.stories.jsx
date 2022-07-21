import React from 'react';
import { Menu } from './Menu';

export default {
  title: 'Menu',
  component: Menu,
};

const Template = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Menu',
};
