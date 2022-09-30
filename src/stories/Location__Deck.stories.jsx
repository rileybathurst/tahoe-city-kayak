// this is the Name.stories.jsx file
import React from 'react';
import {Location__Deck} from './Location__Deck';

export default {
title: 'Location__Deck',
component: Location__Deck,
};

const Template = (args) => <Location__Deck {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'Location__Deck',
};