import React, {Fragment} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

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

const DefaultTemplate: Story<CardLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ColSizeTemplate: Story<CardLayoutBlockModel> = (args) => (
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

export const Default = DefaultTemplate.bind({});
export const ColSize = ColSizeTemplate.bind({});

Default.args = {
    ...data.default.content,
    children: createCardArray(6, data.default.card),
} as CardLayoutBlockProps;

ColSize.args = {
    ...data.default.content,
    children: createCardArray(8, data.colSizes.four.card),
} as CardLayoutBlockProps;
