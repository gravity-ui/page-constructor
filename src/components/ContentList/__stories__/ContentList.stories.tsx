import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {ContentItemProps, ContentListProps} from '../../../models';
import ContentList from '../ContentList';

import data from './data.json';

const transformList = (item: ContentItemProps) => ({
    ...item,
    text: item?.text && yfmTransform(item.text),
    title: item?.title && yfmTransform(item.title),
});

export default {
    args: {list: data.default.content.map(transformList), size: 'l'},
    component: ContentList,
    title: 'Components/ContentList',
} as Meta;

const DefaultTemplate: StoryFn<ContentListProps> = (args) => (
    <div style={{paddingBottom: '64px'}}>
        <ContentList {...args} />
    </div>
);

const DifferentSizeTemplate: StoryFn<ContentListProps> = (args) => (
    <div>
        <h2>Size L</h2>
        <DefaultTemplate {...args} size="l" />
        <h2>Size S</h2>
        <DefaultTemplate {...args} size="s" />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const Size = DifferentSizeTemplate.bind({});
