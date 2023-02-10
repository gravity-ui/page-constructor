import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import LayoutItem from '../LayoutItem';
import {LayoutItemProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    title: `${COMPONENTS}/${CARDS}/LayoutItem`,
    component: LayoutItem,
} as Meta;

const DefaultTemplate: Story<LayoutItemProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <LayoutItem {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});
export const FullScreen = DefaultTemplate.bind({});
export const MetaInfo = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});

Default.args = data.default.content as LayoutItemProps;
FullScreen.args = data.fullScreen.content as LayoutItemProps;
MetaInfo.args = data.metaInfo.content as LayoutItemProps;
Youtube.args = data.youtube.content as LayoutItemProps;
