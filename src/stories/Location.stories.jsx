import React from 'react';
import {Location} from './Location';

export default {
  title: 'Location',
  component: Location,
};

const Template = (args) => <Location {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Location',
};

export const Backed = Template.bind({});
Backed.args = {
  label: 'Backed',
};
