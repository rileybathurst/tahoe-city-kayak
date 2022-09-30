// this is the Name.stories.jsx file
import React from 'react';
import {TopBar} from './TopBar';

export default {
title: 'TopBar',
component: TopBar,
};

const Template = (args) => <TopBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'TopBar',
};

export const Shown = Template.bind({});
Shown.args = {
  label: 'shown',
};