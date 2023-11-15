import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
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

const transformedText = yfmTransform(data.withDescription.content.description);

Default.args = data.default.content as CompaniesBlockProps;
WithDescription.args = {
    ...data.withDescription.content,
    description: transformedText,
} as CompaniesBlockProps;
