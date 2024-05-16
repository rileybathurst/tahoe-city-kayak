// this is the Name.stories.tsx file
import React from 'react';
import { TicketRoll } from './TicketRoll';

export default {
  title: 'TicketRoll',
  component: TicketRoll,
};

const Template = (args) => <TicketRoll {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'TicketRoll',
};