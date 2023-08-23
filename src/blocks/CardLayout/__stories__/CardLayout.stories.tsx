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
                        indentTop: '0',
                        indentBottom: '0',
                    },
                    {
                        ...restArgs,
                        title: `${title} with XS indents at the top and bottom`,
                        indentTop: 'xs',
                        indentBottom: 'xs',
                    },
                    {
                        ...restArgs,
                        title: `${title} with S indents at the top and bottom`,
                        indentTop: 's',
                        indentBottom: 's',
                    },
                    {
                        ...restArgs,
                        title: `${title} with M indents at the top and bottom`,
                        indentTop: 'm',
                        indentBottom: 'm',
                    },
                    {
                        ...restArgs,
                        title: `${title} with L (default) indents at the top and bottom`,
                        indentTop: 'l',
                        indentBottom: 'l',
                    },
                    {
                        ...restArgs,
                        title: `${title} with XL indents at the top and bottom`,
                        indentTop: 'xl',
                        indentBottom: 'xl',
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
