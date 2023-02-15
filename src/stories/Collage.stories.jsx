// this is the Name.stories.jsx file
import React from 'react';
import {Collage} from './Collage';

export default {
title: 'Collage',
component: Collage,
};

const Template = (args) => <Collage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'Collage',
};