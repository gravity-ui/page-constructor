import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {HeaderBlockModel} from '../../../models';
import {PageConstructor} from '../PageConstructor';
import {CONTAINERS} from '../../../demo/constants';

import data from './data.json';

export default {
    title: `${CONTAINERS}/PageConstructor`,
    component: PageConstructor,
} as Meta;

interface TemplateProps {
    items: HeaderBlockModel[];
}

const WithBackgroundTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
            background: data.withTheme.background,
        }}
    />
);

const WithFootnotesTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
            background: data.withFootnotes.background,
            footnotes: data.withFootnotes.footnotes,
        }}
    />
);

export const WithTheme = WithBackgroundTemplate.bind({});
export const WithFootnotes = WithFootnotesTemplate.bind({});

interface PageConstructorStoryProps {
    items: HeaderBlockModel[];
}

WithTheme.args = data.withTheme.content as PageConstructorStoryProps;
WithFootnotes.args = data.withFootnotes.content as PageConstructorStoryProps;
