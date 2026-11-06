import {Meta, StoryFn} from '@storybook/react';

import {blockListTransform, blockTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {
    BackgroundCardProps,
    BasicCardProps,
    BlockType,
    StripBlockModel,
    SubBlockModels,
} from '../../../models';
import BackgroundCard from '../../../sub-blocks/BackgroundCard/BackgroundCard';
import BasicCard from '../../../sub-blocks/BasicCard/BasicCard';
import Strip, {StripBlockProps} from '../Strip';

import data from './data.json';
import cardLayoutData from '../../CardLayout/__stories__/data.json';

export default {
    title: 'Blocks/Strip',
    component: Strip,
    parameters: {
        controls: {
            exclude: ['type'],
        },
    },
    argTypes: {
        color: {
            control: {type: 'radio', labels: {undefined: 'none'}},
            options: [undefined, 'text-color'],
        },
    },
} as Meta;

const renderChild = (childArgs: SubBlockModels, index: number) => {
    const childProps = blockTransform(childArgs);

    switch (childArgs.type) {
        case 'basic-card':
            return <BasicCard key={index} {...(childProps as BasicCardProps)} />;
        case 'background-card':
            return <BackgroundCard key={index} {...(childProps as BackgroundCardProps)} />;
        default:
            return null;
    }
};

const DefaultTemplate: StoryFn<StripBlockModel> = ({children = [], ...args}) => (
    <div style={{padding: '48px'}}>
        <Strip {...(blockTransform(args) as StripBlockProps)} animated={false}>
            {children.map(renderChild)}
        </Strip>
    </div>
);

const CardsTemplate: StoryFn<{blocks: StripBlockModel[]}> = ({blocks}) => (
    // Do not remove PageConstructor: its grid styles keep BackgroundCard content above the background.
    <PageConstructor content={{blocks: blockListTransform(blocks)}} />
);

const cardStripSettings: Pick<
    StripBlockModel,
    'type' | 'description' | 'layout' | 'itemHeight' | 'colSizes'
> = {
    type: BlockType.StripBlock,
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    layout: 'marquee',
    itemHeight: 'auto',
    colSizes: {all: 6, sm: 6, md: 4},
};
const priceCardButtons = [
    cardLayoutData.buttons.outlined,
    cardLayoutData.buttons.action,
    cardLayoutData.buttons.monochrome,
];

export const Default = DefaultTemplate.bind({});
export const Wrap = DefaultTemplate.bind({});
export const Cards = CardsTemplate.bind({});
export const OneImage = DefaultTemplate.bind({});
export const CustomSizing = DefaultTemplate.bind({});

Default.args = data.default.content as StripBlockModel;
Wrap.args = data.wrap.content as StripBlockModel;
Cards.args = {
    blocks: [
        {
            ...cardStripSettings,
            title: 'Basic Card',
            children: Array.from({length: 6}, () => ({...cardLayoutData.cards.basicCard})),
        },
        {
            ...cardStripSettings,
            title: 'Background Card',
            children: Array.from({length: 6}, () => ({...cardLayoutData.cards.backgroundCard})),
        },
        {
            ...cardStripSettings,
            title: 'Layout Item',
            children: Array.from({length: 6}, () => ({
                ...cardLayoutData.cards.layoutItem,
                content: {...cardLayoutData.cards.layoutItem.content},
            })),
        },
        {
            ...cardStripSettings,
            title: 'Price Card',
            children: Array.from({length: 6}, (_, index) => ({
                ...cardLayoutData.cards.priceCard,
                buttons: [priceCardButtons[index % priceCardButtons.length]],
            })),
        },
        {
            ...cardStripSettings,
            title: 'Image Card',
            children: Array.from({length: 6}, () => ({...cardLayoutData.cards.imageCard})),
        },
    ],
} as {blocks: StripBlockModel[]};
Cards.parameters = {
    controls: {
        include: ['blocks'],
    },
};
OneImage.args = data.oneImage.content as StripBlockModel;
CustomSizing.args = data.customSizing.content as StripBlockModel;
