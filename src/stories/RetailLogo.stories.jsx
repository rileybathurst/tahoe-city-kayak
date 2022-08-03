import React from 'react';
import {RetailLogo} from './RetailLogo';

export default {
title: 'RetailLogo',
component: RetailLogo,
};

const Template = (args) => <RetailLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: 'RetailLogo',
};