// this is the Name.stories.tsx file
import React from 'react';
import { Ticket } from './Ticket';

export default {
  title: 'Ticket',
  component: Ticket,
};

const Template = (args) => <Ticket {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Ticket',
};