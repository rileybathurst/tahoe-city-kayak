// this is the Name.stories.jsx file
import React from 'react';
import {BrandList} from './BrandList';

export default {
title: 'BrandList',
component: BrandList,
};

const Template = (args) => <BrandList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'BrandList',
};