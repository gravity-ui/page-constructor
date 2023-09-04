import React, {Fragment} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {
    CardLayoutBlockModel,
    CardLayoutBlockProps,
    LayoutItemModel,
    LayoutItemProps,
    SubBlockModels,
} from '../../../models';
import CardLayout from '../CardLayout';

import data from './data.json';

export default {
    title: 'Blocks/CardLayout',
    component: CardLayout,
} as Meta;

const createCardArray: (count: number, shared: LayoutItemProps) => SubBlockModels[] = (
    count,
    shared,
) => Array.from({length: count}, () => ({...shared} as LayoutItemModel));

const DefaultTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ColSizeTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <Fragment>
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...args,
                        description: data.colSizes.four.description,
                        colSizes: data.colSizes.four.colSizes,
                    },
                    {
                        ...args,
                        description: data.colSizes.two.description,
                        colSizes: data.colSizes.two.colSizes,
                        children: createCardArray(8, data.colSizes.two.card) as SubBlockModels[],
                    },
                ],
            }}
        />
    </Fragment>
);

const WithCustomIndentsTemplate: StoryFn<CardLayoutBlockModel> = ({title, ...restArgs}) => (
    <Fragment>
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...restArgs,
                        title: `${title} with zero indents at the top and bottom`,
                        indent: {
                            top: '0',
                            bottom: '0',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with XS indents at the top and bottom`,
                        indent: {
                            top: 'xs',
                            bottom: 'xs',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with S indents at the top and bottom`,
                        indent: {
                            top: 's',
                            bottom: 's',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with M indents at the top and bottom`,
                        indent: {
                            top: 'm',
                            bottom: 'm',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with L (default) indents at the top and bottom`,
                        indent: {
                            top: 'l',
                            bottom: 'l',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with XL indents at the top and bottom`,
                        indent: {
                            top: 'xl',
                            bottom: 'xl',
                        },
                    },
                ],
            }}
        />
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ColSize = ColSizeTemplate.bind({});
export const WithCustomIndents = WithCustomIndentsTemplate.bind({});

Default.args = {
    ...data.default.content,
    children: createCardArray(6, data.default.card),
} as CardLayoutBlockProps;

ColSize.args = {
    ...data.default.content,
    children: createCardArray(8, data.colSizes.four.card),
} as CardLayoutBlockProps;

WithCustomIndents.args = {
    ...data.default.content,
    children: createCardArray(3, data.default.card),
} as CardLayoutBlockProps;
