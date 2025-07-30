import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {CompaniesBlockModel, CompaniesBlockProps} from '../../../models';
import Companies from '../Companies';

import data from './data.json';

export default {
    title: 'Blocks/Companies',
    component: Companies,
    parameters: {
        controls: {
            exclude: ['type'],
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<CompaniesBlockModel> = (args) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {type, ...props} = blockTransform(args);
    return <Companies {...(props as CompaniesBlockProps)} />;
};

export const Default = DefaultTemplate.bind({});
export const WithDescription = DefaultTemplate.bind({});

Default.args = data.default.content as CompaniesBlockModel;
WithDescription.args = data.withDescription.content as CompaniesBlockModel;
