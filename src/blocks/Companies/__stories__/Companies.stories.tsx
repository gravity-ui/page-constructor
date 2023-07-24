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

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as CompaniesBlockProps;
