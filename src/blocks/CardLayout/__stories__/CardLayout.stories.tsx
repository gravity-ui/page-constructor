import {Meta, StoryFn} from '@storybook/react';

import {yfmTransformInline} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {CardLayoutBlockModel, SubBlockModels} from '../../../models';
import CardLayout from '../CardLayout';

import data from './data.json';

export default {
    title: 'Blocks/CardLayout',
    component: CardLayout,
    parameters: {
        controls: {
            include: ['blocks'],
        },
    },
} as Meta;

const createCardArray: (
    count: number,
    shared: Omit<SubBlockModels, 'type'> & {type: string},
) => SubBlockModels[] = (count, shared) =>
    Array.from({length: count}, () => ({...shared}) as SubBlockModels);

const DefaultTemplate: StoryFn<{blocks: CardLayoutBlockModel[]}> = ({blocks}) => {
    return <PageConstructor content={{blocks}} />;
};

export const Default = DefaultTemplate.bind({});
export const ColSize = DefaultTemplate.bind({});
export const WithBackground = DefaultTemplate.bind({});

Default.args = {
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
            ...data.default.content,
            title: 'Card layout with image cards',
            children: createCardArray(3, data.cards.imageCard),
        },
    ] as CardLayoutBlockModel[],
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
