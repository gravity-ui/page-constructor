import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {FilterBlockModel} from '../../../models';
import FilterBlock from '../FilterBlock';

import data from './data.json';

export default {
    title: 'Blocks/FilterBlock',
    component: FilterBlock,
    argTypes: {
        allTag: {
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        tagButtonSize: {
            table: {
                defaultValue: {
                    summary: '"l"',
                },
            },
        },
        centered: {
            table: {
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        animated: {
            table: {
                defaultValue: {
                    summary: 'true',
                },
            },
        },
        colSizes: {
            table: {
                defaultValue: {
                    summary: '{all: 12, sm: 6, md: 4};',
                },
            },
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<FilterBlockModel> = (args) => (
    <PageConstructor content={{blocks: [blockTransform(args)]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithAllTag = DefaultTemplate.bind({});
export const WithCustomAllTag = DefaultTemplate.bind({});
export const Centered = DefaultTemplate.bind({});

Default.args = data.default as FilterBlockModel;
WithAllTag.args = {...data.default, allTag: true} as FilterBlockModel;
WithCustomAllTag.args = {...data.default, allTag: 'Custom All Tag Name'} as FilterBlockModel;
Centered.args = {...data.default, centered: true} as FilterBlockModel;
