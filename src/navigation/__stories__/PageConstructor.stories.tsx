import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor, PageConstructorProps} from '../../containers/PageConstructor';
import {NAVIGATION} from '../../demo/constants';

import data from './data.json';

export default {
    title: `${NAVIGATION}/PageConstructor`,
    component: PageConstructor,
} as Meta;

const DefaultTemplate: Story<PageConstructorProps> = (args) => <PageConstructor {...args} />;
export const DefaultNavigation = DefaultTemplate.bind({});
export const NavigationWithBorder = DefaultTemplate.bind({});

const DefaultProps = {
    content: {
        blocks: data.default.content.blocks,
    },
};

DefaultNavigation.args = {
    ...DefaultProps,
    navigation: data.navigation,
} as PageConstructorProps;

NavigationWithBorder.args = {
    ...DefaultProps,
    navigation: {
        ...data.navigation,
        header: {
            ...data.navigation.header,
            withBorder: true,
        },
    },
} as PageConstructorProps;
