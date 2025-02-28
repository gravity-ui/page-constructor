import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransformInline} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {CardLayoutBlockModel, CardLayoutBlockProps, SubBlockModels} from '../../../models';
import CardLayout from '../CardLayout';

import data from './data.json';

export default {
    title: 'Blocks/CardLayout',
    component: CardLayout,
} as Meta;

const createCardArray: (
    count: number,
    shared: Omit<SubBlockModels, 'type'> & {type: string},
) => SubBlockModels[] = (count, shared) =>
    Array.from({length: count}, () => ({...shared}) as SubBlockModels);

const DefaultTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    children: createCardArray(6, data.cards.basicCard),
                },
                {
                    ...args,
                    title: 'Card layout with layout items',
                    children: createCardArray(3, data.cards.layoutItem),
                },
                {
                    ...args,
                    title: 'Card layout with background cards',
                    children: createCardArray(3, data.cards.backgroundCard),
                },
                {
                    ...args,
                    title: 'Card layout with price cards',
                    children: [
                        {
                            ...data.cards.priceCard,
                            title: yfmTransformInline(data.cards.priceCard.title),
                            buttons: [data.buttons.outlined],
                        },
                        {
                            ...data.cards.priceCard,
                            title: yfmTransformInline(data.cards.priceCard.title),
                            buttons: [data.buttons.action],
                        },
                        {
                            ...data.cards.priceCard,
                            title: yfmTransformInline(data.cards.priceCard.title),
                            buttons: [data.buttons.monochrome],
                        },
                    ],
                },
                {
                    ...args,
                    title: 'Card layout with image cards',
                    children: createCardArray(3, data.cards.imageCard),
                },
            ],
        }}
    />
);

const ColSizeTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <React.Fragment>
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
    </React.Fragment>
);

const WithBackgroundTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    background: data.backgrounds.image,
                    children: createCardArray(8, data.cards.basicCard),
                },
                {
                    ...args,
                    title: 'Card layout with background color (basic cards)',
                    background: data.backgrounds.backgroundColor,
                    children: createCardArray(4, data.cards.basicCard),
                },
                {
                    ...args,
                    background: data.backgrounds.backgroundColorAndShadow,
                    title: 'Card layout with background color and shadow (layout items)',
                    ...data.colSizes.threeOne,
                    children: createCardArray(3, data.cards.layoutItem),
                },
                {
                    ...args,
                    title: 'Card layout with background image (price cards)',
                    background: data.backgrounds.image,
                    children: createCardArray(4, data.cards.priceCard),
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const ColSize = ColSizeTemplate.bind({});
export const WithBackground = WithBackgroundTemplate.bind({});

Default.args = {
    ...data.default.content,
} as CardLayoutBlockProps;

ColSize.args = {
    ...data.default.content,
    children: createCardArray(8, data.colSizes.four.card),
} as CardLayoutBlockProps;

WithBackground.args = {
    ...data.withBackground.content,
} as CardLayoutBlockProps;
