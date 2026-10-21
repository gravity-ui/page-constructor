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

export const Collapsible = DefaultTemplate.bind({});
Collapsible.args = {
    ...data.default,
    allTag: {id: 'all', label: 'All', collapsible: true},
    tags: data.default.tags.map((tag, index) => ({...tag, collapsible: index === 0})),
    items: [...data.default.items, ...data.default.items, ...data.default.items],
    colSizes: {all: 12, md: 6, lg: 3},
    visibleRowsCount: {all: 3, md: 2, lg: 2},
} as FilterBlockModel;

export const CollapsibleWithFewCards = DefaultTemplate.bind({});
CollapsibleWithFewCards.args = {
    ...Collapsible.args,
    title: 'Collapsible list with few cards',
    description:
        'All three cards fit within the row limit at every breakpoint, so no expand button is shown.',
    items: data.default.items.slice(0, 3),
} as FilterBlockModel;

export const CollapsibleResponsiveRows = DefaultTemplate.bind({});
CollapsibleResponsiveRows.args = {
    ...Collapsible.args,
    title: 'Responsive collapsed rows',
    description:
        'Resize the viewport: 1185px and wider — 8 cards (4 × 2 rows); 1081–1184px — 9 cards (3 × 3 rows); 769–1080px — 8 cards (2 × 4 rows); below 769px — 3 cards (1 × 3 rows).',
    colSizes: {all: 12, md: 6, lg: 4, xl: 3},
    visibleRowsCount: {all: 3, md: 4, lg: 3, xl: 2},
} as FilterBlockModel;
