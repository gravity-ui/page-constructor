import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {LayoutItemProps} from '../../../models';
import LayoutItem from '../LayoutItem';

import data from './data.json';

export default {
    title: 'Components/Cards/LayoutItem',
    component: LayoutItem,
} as Meta;

const DefaultTemplate: StoryFn<LayoutItemProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <LayoutItem {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Fullscreen = DefaultTemplate.bind({});
export const MetaInfo = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    content: {
        ...data.default.content.content,
        text: yfmTransform(data.default.content.content.text),
    },
};

Default.args = DefaultArgs as LayoutItemProps;
Fullscreen.args = {...DefaultArgs, ...data.fullscreen.content} as LayoutItemProps;
MetaInfo.args = {
    ...DefaultArgs,
    ...data.metaInfo.content,
    metaInfo: data.metaInfo.content.metaInfo.map((item) => yfmTransform(item)),
} as LayoutItemProps;
Youtube.args = {...DefaultArgs, ...data.youtube.content} as LayoutItemProps;
