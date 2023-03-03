// this is the Name.stories.jsx file
import React from 'react';
import {Composition} from './Composition';

export default {
title: 'Composition',
component: Composition,
};

const Template = (args) => <Composition {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'Composition',
};