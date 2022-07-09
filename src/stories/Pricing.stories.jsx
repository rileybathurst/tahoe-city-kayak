import React from 'react';
import { Pricing } from './Pricing';

export default {
  title: 'Pricing',
  component: Pricing,
};

const Template = (args) => <Pricing {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Pricing',
};
