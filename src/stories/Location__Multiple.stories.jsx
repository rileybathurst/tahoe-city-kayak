// this is the Name.stories.jsx file
import React from 'react';
import {Location__Multiple} from './Location__Multiple';

export default {
title: 'Location__Multiple',
component: Location__Multiple,
};

const Template = (args) => <Location__Multiple {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'Location__Multiple',
};