import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import Companies from '../Companies';
import {CompaniesBlockModel, CompaniesBlockProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Companies',
    component: Companies,
} as Meta;

const DefaultTemplate: Story<CompaniesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithThemes = DefaultTemplate.bind({});

Default.args = data.default.content as CompaniesBlockProps;
WithThemes.args = data.withThemes.content as CompaniesBlockProps;
