import React from 'react';
import {Location_Card} from './Location_Card';

export default {
  title: 'Location Card',
  component: Location_Card,
};

const Template = (args) => <Location_Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Location',
};

export const Backed = Template.bind({});
Backed.args = {
  label: 'Backed',
};
