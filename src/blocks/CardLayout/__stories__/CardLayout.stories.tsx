import * as React from 'react';
import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {
    BackgroundCardProps,
    BasicCardProps,
    CardLayoutBlockModel,
    ImageCardProps,
    LayoutItemProps,
    PriceCardProps,
    SubBlockModels,
} from '../../../models';
import {BackgroundCard, BasicCard, ImageCard, LayoutItem, PriceCard} from '../../../sub-blocks';
import CardLayout, {CardLayoutBlockProps} from '../CardLayout';

import data from './data.json';

export default {
    title: 'Blocks/CardLayout',
    component: CardLayout,
} as Meta;

const renderChild = (childArgs: SubBlockModels, index?: number) => {
    const childProps = blockTransform(childArgs);
    switch (childArgs.type) {
        case 'basic-card':
            return <BasicCard key={index} {...(childProps as BasicCardProps)} />;
        case 'layout-item':
            return <LayoutItem key={index} {...(childProps as LayoutItemProps)} />;
        case 'background-card':
            return <BackgroundCard key={index} {...(childProps as BackgroundCardProps)} />;
        case 'price-card':
            return <PriceCard key={index} {...(childProps as PriceCardProps)} />;
        case 'image-card':
            return <ImageCard key={index} {...(childProps as ImageCardProps)} />;
        default:
            return null;
    }
};

const createCardArray: (
    count: number,
    shared: Omit<SubBlockModels, 'type'> & {type: string},
) => SubBlockModels[] = (count, shared) =>
    Array.from({length: count}, () => ({...shared}) as SubBlockModels);

const DefaultTemplate: StoryFn<CardLayoutBlockModel> = ({children = [], ...args}) => {
    return (
        <div style={{padding: '48px'}}>
            <CardLayout {...(blockTransform(args) as CardLayoutBlockProps)} animated={false}>
                {children.map(renderChild)}
            </CardLayout>
        </div>
    );
};

const MultipleTemplate: StoryFn<{blocks: CardLayoutBlockModel[]}> = ({blocks}) => (
    <React.Fragment>
        {blocks.map(({children = [], ...itemArgs}, index) => (
            <div key={index} style={{padding: '48px'}}>
                <CardLayout
                    {...(itemArgs as CardLayoutBlockProps)}
                    animated={false}
                    className="card-layout-stories"
                >
                    {children.map(renderChild)}
                </CardLayout>
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ChildrenCardOptions = MultipleTemplate.bind({});
export const ColSize = MultipleTemplate.bind({});
export const WithBackground = MultipleTemplate.bind({});

Default.args = {
    ...data.default.content,
    children: createCardArray(6, data.cards.basicCard),
} as CardLayoutBlockModel;

ChildrenCardOptions.args = {
    blocks: [
        {
            ...data.default.content,
            children: createCardArray(6, data.cards.basicCard),
        },
        {
            ...data.default.content,
            title: 'Card layout with layout items',
            children: createCardArray(3, data.cards.layoutItem),
        },
        {
            ...data.default.content,
            title: 'Card layout with background cards',
            children: createCardArray(3, data.cards.backgroundCard),
        },
        {
            ...data.default.content,
            title: 'Card layout with price cards',
            children: [
                {
                    ...data.cards.priceCard,
                    buttons: [data.buttons.outlined],
                },
                {
                    ...data.cards.priceCard,
                    buttons: [data.buttons.action],
                },
                {
                    ...data.cards.priceCard,
                    buttons: [data.buttons.monochrome],
                },
            ],
        },
        {
            ...data.default.content,
            title: 'Card layout with image cards',
            children: createCardArray(3, data.cards.imageCard),
        },
    ],
} as {blocks: CardLayoutBlockModel[]};
ChildrenCardOptions.parameters = {
    controls: {
        include: ['blocks'],
    },
};

ColSize.args = {
    blocks: [
        {
            ...data.default.content,
            children: createCardArray(8, data.colSizes.four.card),
            description: data.colSizes.four.description,
            colSizes: data.colSizes.four.colSizes,
        },
        {
            ...data.default.content,
            description: data.colSizes.two.description,
            colSizes: data.colSizes.two.colSizes,
            children: createCardArray(8, data.colSizes.two.card),
        },
    ] as CardLayoutBlockModel[],
};
ColSize.parameters = {
    controls: {
        include: ['blocks'],
    },
};

WithBackground.args = {
    blocks: [
        {
            ...data.withBackground.content,
            background: data.backgrounds.image,
            children: createCardArray(8, data.cards.basicCard),
        },
        {
            ...data.withBackground.content,
            title: 'Card layout with background color (basic cards)',
            background: data.backgrounds.backgroundColor,
            children: createCardArray(4, data.cards.basicCard),
        },
        {
            ...data.withBackground.content,
            background: data.backgrounds.backgroundColorAndShadow,
            title: 'Card layout with background color and shadow (layout items)',
            ...data.colSizes.threeOne,
            children: createCardArray(3, data.cards.layoutItem),
        },
        {
            ...data.withBackground.content,
            title: 'Card layout with background image (price cards)',
            background: data.backgrounds.image,
            children: createCardArray(4, data.cards.priceCard),
        },
    ] as CardLayoutBlockModel[],
};
WithBackground.parameters = {
    controls: {
        include: ['blocks'],
    },
};
