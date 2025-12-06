import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {TabsBlockModel, TabsBlockProps} from '../../../models';
import Tabs, {TabsBlock} from '../Tabs';

import data from './data.json';

export default {
    title: 'Blocks/Tabs',
    component: Tabs,
    argTypes: {
        description: {control: 'text'},
    },
} as Meta;

const DefaultTemplate: StoryFn<TabsBlockModel> = (args) => (
    <div style={{padding: 64, display: 'flex', gap: 20, flexDirection: 'column'}}>
        <TabsBlock {...(blockTransform(args) as TabsBlockProps)} />
    </div>
);

const ButtonsColSizesTemplate: StoryFn<TabsBlockModel> = (args) => (
    <React.Fragment>
        <DefaultTemplate
            {...args}
            tabsColSizes={data.buttonsColSizes.wide.colSizes}
            title={data.buttonsColSizes.wide.title}
        />
        <DefaultTemplate
            {...args}
            tabsColSizes={data.buttonsColSizes.narrow.colSizes}
            title={data.buttonsColSizes.narrow.title}
        />
    </React.Fragment>
);

const DirectionTemplate: StoryFn<TabsBlockModel> = (args) => (
    <React.Fragment>
        <DefaultTemplate {...args} />
        <DefaultTemplate {...args} direction={'content-media'} />
    </React.Fragment>
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
} as TabsBlockProps;

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

TabsButtonsColSizes.args = {
    ...data.default.content,
    items: DefaultArgs.items.concat(
        DefaultArgs.items.map((item, index) => {
            return {
                ...item,
                tabName: `${item.tabName} ${index}`,
            };
        }),
        DefaultArgs.items.map((item, index) => {
            return {
                ...item,
                tabName: `${item.tabName} ${index} ${index}`,
            };
        }),
    ),
} as TabsBlockModel;

Centered.args = {
    ...DefaultArgs,
    description: data.description,
    centered: true,
} as TabsBlockModel;

Direction.args = {...DefaultArgs} as TabsBlockModel;

Caption.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item) => ({
        ...item,
    })),
} as TabsBlockModel;

MediaBorder.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item, index) => ({
        ...item,
        border: ['line', 'none', 'shadow'][index % 3],
    })),
} as TabsBlockModel;
