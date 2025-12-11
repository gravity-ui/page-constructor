import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {TabsBlockModel, TabsBlockProps} from '../../../models';
import Tabs, {TabsBlock} from '../Tabs';

import data from './data.json';

export default {
    title: 'Blocks/Tabs',
    component: Tabs,
} as Meta;

const DefaultTemplate: StoryFn<TabsBlockModel> = (args) => (
    <div style={{padding: 64, display: 'flex', gap: 20, flexDirection: 'column'}}>
        <TabsBlock {...(blockTransform(args) as TabsBlockProps)} />
    </div>
);

const ButtonsColSizesTemplate: StoryFn<Record<string, TabsBlockModel>> = (args) => (
    <div style={{padding: 64, display: 'flex', gap: 20, flexDirection: 'column'}}>
        {Object.entries(args)
            .map(([key, item]) => {
                return <TabsBlock key={key} {...(blockTransform(item) as TabsBlockProps)} />;
            })
            .filter(Boolean)}
    </div>
);

const DirectionTemplate: StoryFn<Record<string, TabsBlockModel>> = (args) => (
    <div style={{padding: 64, display: 'flex', gap: 20, flexDirection: 'column'}}>
        {Object.entries(args)
            .map(([key, item]) => {
                return <TabsBlock key={key} {...(blockTransform(item) as TabsBlockProps)} />;
            })
            .filter(Boolean)}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const OnlyMedia = DefaultTemplate.bind({});
export const OnlyText = DefaultTemplate.bind({});
export const TabsButtonsColSizes = ButtonsColSizesTemplate.bind({});
export const Centered = DefaultTemplate.bind({});
export const Direction = DirectionTemplate.bind({});
export const Caption = DefaultTemplate.bind({});
export const MediaBorder = DefaultTemplate.bind({});

const DefaultArgs = data.default.content;

Default.args = {
    ...DefaultArgs,
    description: data.description,
} as TabsBlockModel;

OnlyMedia.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item) => ({
        ...item,
        text: undefined,
    })),
} as TabsBlockModel;

OnlyText.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item) => ({
        ...item,
        media: undefined,
        image: undefined,
    })),
} as TabsBlockModel;

Centered.args = {
    ...DefaultArgs,
    description: data.description,
    centered: true,
} as TabsBlockModel;

Caption.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item) => ({...item})),
} as TabsBlockModel;

MediaBorder.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item, index) => ({
        ...item,
        border: ['line', 'none', 'shadow'][index % 3],
    })),
} as TabsBlockModel;

const TABS_COL_SIZES: Record<string, TabsBlockModel> = {
    wide: {
        ...DefaultArgs,
        tabsColSizes: data.buttonsColSizes.wide.colSizes,
        title: data.buttonsColSizes.wide.title,
        items: DefaultArgs.items.concat(
            DefaultArgs.items.map((item, index) => ({
                ...item,
                tabName: `${item.tabName} ${index}`,
            })),
            DefaultArgs.items.map((item, index) => ({
                ...item,
                tabName: `${item.tabName} ${index} ${index}`,
            })),
        ),
    } as TabsBlockModel,
    narrow: {
        ...DefaultArgs,
        tabsColSizes: data.buttonsColSizes.narrow.colSizes,
        title: data.buttonsColSizes.narrow.title,
        items: DefaultArgs.items.concat(
            DefaultArgs.items.map((item, index) => ({
                ...item,
                tabName: `${item.tabName} ${index}`,
            })),
            DefaultArgs.items.map((item, index) => ({
                ...item,
                tabName: `${item.tabName} ${index} ${index}`,
            })),
        ),
    } as TabsBlockModel,
};

TabsButtonsColSizes.args = TABS_COL_SIZES;
TabsButtonsColSizes.parameters = {
    controls: {
        include: Object.keys(TABS_COL_SIZES),
    },
};

const DIRECTIONS: Record<string, TabsBlockModel> = {
    media_content: {
        ...DefaultArgs,
    } as TabsBlockModel,
    content_media: {
        ...DefaultArgs,
        direction: 'content-media',
    } as TabsBlockModel,
};

Direction.args = DIRECTIONS;
Direction.parameters = {
    controls: {
        include: Object.keys(DIRECTIONS),
    },
};
