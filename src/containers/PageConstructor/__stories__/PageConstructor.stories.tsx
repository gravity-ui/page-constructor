import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {HeaderBlockModel, NavigationData} from '../../../models';
import {PageConstructor} from '../PageConstructor';
import {CONTAINERS} from '../../../demo/constants';

import data from './data.json';

export default {
    title: `${CONTAINERS}/PageConstructor`,
    component: PageConstructor,
} as Meta;

interface TemplateProps {
    items: HeaderBlockModel[];
    navigation?: NavigationData;
}

const DefaultTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
            background: data.default.background,
        }}
    />
);

const WithFootnotesTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
            background: data.default.background,
            footnotes: data.withFootnotes.footnotes,
        }}
    />
);

const NavigationTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
        }}
        navigation={args.navigation}
    />
);

export const Default = DefaultTemplate.bind({});
export const WithFootnotes = WithFootnotesTemplate.bind({});
export const Navigation = NavigationTemplate.bind({});

interface PageConstructorStoryProps {
    items: HeaderBlockModel[];
    navigation?: NavigationData;
}

Default.args = data.default.content as PageConstructorStoryProps;
WithFootnotes.args = data.default.content as PageConstructorStoryProps;
Navigation.args = {
    items: data.default.content.items,
    navigation: data.navigation,
} as PageConstructorStoryProps;
