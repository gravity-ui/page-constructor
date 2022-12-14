import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import HeaderBreadcrumbs from '../HeaderBreadcrumbs';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';
import {HeaderBreadCrumbsProps} from '../../../models';

import data from './data.json';

export default {
    component: HeaderBreadcrumbs,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/HeaderBreadcrumbs`,
} as Meta;

const DefaultTemplate: Story<HeaderBreadCrumbsProps> = (args) => <HeaderBreadcrumbs {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as HeaderBreadCrumbsProps;
