import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {CompaniesBlockModel, CompaniesBlockProps} from '../../../models';
import Companies from '../Companies';

import data from './data.json';

export default {
    title: 'Blocks/Companies',
    component: Companies,
} as Meta;

const DefaultTemplate: StoryFn<CompaniesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const WithDescriptionTemplate: StoryFn<CompaniesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithDescription = WithDescriptionTemplate.bind({});

Default.args = data.default.content as CompaniesBlockProps;
WithDescription.args = {
    ...data.default.content,
    description:
        '<p><strong>Ut enim ad minim veniam</strong> <a href="https://example.com">quis nostrud</a> exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n',
} as CompaniesBlockProps;
