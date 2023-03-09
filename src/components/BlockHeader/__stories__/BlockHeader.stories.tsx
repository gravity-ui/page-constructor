import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {ClassNameProps, TitleProps} from '../../../models';

import BlockHeader, {BlockHeaderProps} from '../BlockHeader';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';
import {yfmTransform} from '../../../../.storybook/utils';

export default {
    component: BlockHeader,
    title: `${COMPONENTS}/BlockHeader`,
} as Meta;

const DefaultTemplate: Story<BlockHeaderProps & ClassNameProps> = (args) => (
    <BlockHeader {...args} />
);

const SizesTemplate: Story<BlockHeaderProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.l as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.m as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.s as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.xs as TitleProps} />
        </div>
    </div>
);

const DefaultArgs = {
    ...data.default.content,
    description: yfmTransform(data.default.content.description),
};

export const Default = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind({});

Default.args = {
    ...DefaultArgs,
} as BlockHeaderProps;
TitleLink.args = {
    ...DefaultArgs,
    title: data.titleLink.content.title,
} as BlockHeaderProps;
CustomTitle.args = {
    ...DefaultArgs,
    title: data.customTitle.content.title,
} as BlockHeaderProps;
Sizes.args = {
    ...DefaultArgs,
    title: data.customTitle.content.title,
} as BlockHeaderProps;
