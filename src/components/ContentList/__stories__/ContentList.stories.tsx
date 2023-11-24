import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {ContentItemProps, ContentListProps} from '../../../models';
import ContentList from '../ContentList';

import data from './data.json';

const transformListItem = (item: ContentItemProps) => ({
    ...item,
    text: item?.text && yfmTransform(item.text),
    title: item?.title && yfmTransform(item.title),
});

export default {
    args: {list: data.default.content.map(transformListItem), size: 'l'},
    component: ContentList,
    title: 'Components/ContentList',
} as Meta;

const DefaultTemplate: StoryFn<ContentListProps> = (args) => (
    <div style={{paddingBottom: '16px'}}>
        <ContentList {...args} />
    </div>
);

const DifferentContentTempalte: StoryFn<ContentListProps> = (args) => (
    <div style={{paddingBottom: '64px'}}>
        <h3>Default</h3>
        <DefaultTemplate {...args} />
        <h3>Without text</h3>
        <DefaultTemplate {...args} list={data.withoutText.content.map(transformListItem)} />
        <h3>Without title</h3>
        <DefaultTemplate {...args} list={data.withoutTitle.content.map(transformListItem)} />
    </div>
);

const DifferentSizeTemplate: StoryFn<ContentListProps> = (args) => (
    <div>
        <h1>Size L</h1>
        <DifferentContentTempalte {...args} size="l" />
        <h1>Size S</h1>
        <DifferentContentTempalte {...args} size="s" />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const Size = DifferentSizeTemplate.bind({});
