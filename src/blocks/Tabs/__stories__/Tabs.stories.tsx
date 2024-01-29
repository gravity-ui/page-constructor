import React, {Fragment} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {TabsBlockModel, TabsBlockProps} from '../../../models';
import Tabs from '../Tabs';

import data from './data.json';

export default {
    title: 'Blocks/Tabs',
    component: Tabs,
    argTypes: {
        description: {control: 'text'},
    },
} as Meta;

const DefaultTemplate: StoryFn<TabsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ButtonsColSizesTemplate: StoryFn<TabsBlockModel> = (args) => (
    <Fragment>
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
    </Fragment>
);

const DirectionTemplate: StoryFn<TabsBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} />
        <DefaultTemplate {...args} direction={'content-media'} />
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const OnlyMedia = DefaultTemplate.bind({});
export const OnlyText = DefaultTemplate.bind({});
export const TabsButtonsColSizes = ButtonsColSizesTemplate.bind({});
export const Centered = DefaultTemplate.bind({});
export const Direction = DirectionTemplate.bind({});
export const Caption = DefaultTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    items: data.default.content.items.map((item) => ({
        ...item,
        text: yfmTransform(item.text),
        additionalInfo: item.additionalInfo && yfmTransform(item.additionalInfo),
        caption: item.caption && yfmTransform(item.caption),
    })),
};

Default.args = {
    ...DefaultArgs,
    description: yfmTransform(data.description),
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
    description: yfmTransform(data.description),
    centered: true,
} as TabsBlockModel;

Direction.args = {...DefaultArgs} as TabsBlockModel;

Caption.args = {
    ...DefaultArgs,
    items: DefaultArgs.items.map((item) => ({
        ...item,
    })),
} as TabsBlockModel;
