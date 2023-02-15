// this is the Name.stories.jsx file
import React from 'react';
import {Layout} from './Layout';

export default {
title: 'Layout',
component: Layout,
};

const Template = (args) => <Layout {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'Layout',
};