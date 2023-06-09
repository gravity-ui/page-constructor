import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '../../containers/PageConstructor';
import {NAVIGATION} from '../../demo/constants';
import {NavigationData} from '../../models';

import data from './data.json';

export default {
    title: `${NAVIGATION}/Navigation`,
    component: PageConstructor,
} as Meta;

const DefaultTemplate: Story<NavigationData> = (args) => <PageConstructor navigation={args} />;
export const DefaultNavigation = DefaultTemplate.bind({});
export const NavigationWithBorder = DefaultTemplate.bind({});

DefaultNavigation.args = data.navigation as NavigationData;

NavigationWithBorder.args = {
    ...data.navigation,
    header: {
        ...data.navigation.header,
        withBorder: true,
    },
} as NavigationData;
