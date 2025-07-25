import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {CompaniesBlockModel, CompaniesBlockProps} from '../../../models';
import Companies from '../Companies';

import data from './data.json';

export default {
    title: 'Blocks/Companies',
    component: Companies,
} as Meta;

const DefaultTemplate: StoryFn<CompaniesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [blockTransform(args)]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithDescription = DefaultTemplate.bind({});

Default.args = data.default.content as CompaniesBlockProps;
WithDescription.args = data.withDescription.content as CompaniesBlockProps;
