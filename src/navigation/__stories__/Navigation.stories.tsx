import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../containers/PageConstructor';
import {CustomConfig, NavigationData} from '../../models';

import {CustomComponent} from './CustomComponent/CustomComponent';

import data from './data.json';

export default {
    title: 'NAVIGATION/Navigation',
    component: PageConstructor,
} as Meta;

const DefaultTemplate: StoryFn<{
    navigation: NavigationData;
    custom?: CustomConfig;
}> = ({navigation, custom = {}}) => <PageConstructor navigation={navigation} custom={custom} />;
export const DefaultNavigation = DefaultTemplate.bind({});
export const NavigationWithBorder = DefaultTemplate.bind({});
export const NavigationWithCustomItems = DefaultTemplate.bind({});

DefaultNavigation.args = {
    navigation: data.navigation as NavigationData,
};

NavigationWithBorder.args = {
    navigation: {
        ...data.navigation,
        header: {
            ...data.navigation.header,
            withBorder: true,
            withBorderOnScroll: true,
        },
    } as NavigationData,
};

NavigationWithCustomItems.args = {
    custom: {
        navigation: {
            'custom-item': CustomComponent,
        },
    },
    navigation: {
        ...data.navigation,
        header: {
            ...data.navigation.header,
            rightItems: [
                ...data.navigation.header.rightItems,
                {
                    type: 'custom-item',
                },
            ],
        },
    } as NavigationData,
};
