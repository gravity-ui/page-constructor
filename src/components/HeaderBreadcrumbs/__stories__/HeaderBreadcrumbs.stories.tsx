import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {HeaderBreadCrumbsProps} from '../../../models';
import HeaderBreadcrumbs from '../HeaderBreadcrumbs';

import data from './data.json';

export default {
    component: HeaderBreadcrumbs,
    title: 'Components/Links and buttons/HeaderBreadcrumbs',
} as Meta;

const DefaultTemplate: StoryFn<HeaderBreadCrumbsProps> = (args) => <HeaderBreadcrumbs {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as HeaderBreadCrumbsProps;
