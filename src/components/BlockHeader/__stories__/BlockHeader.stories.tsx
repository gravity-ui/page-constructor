import {Meta, Story} from '@storybook/react/types-6-0';
import {ClassNameProps, TitleProps} from '../../../models';
import React from 'react';

import BlockHeader, {BlockHeaderProps} from '../BlockHeader';
import {COMPONENTS, HEADERS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: BlockHeader,
    title: `${COMPONENTS}/${HEADERS}/BlockHeader`,
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
    </div>
);

export const Default = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind({});

Default.args = data.default.content as BlockHeaderProps;
TitleLink.args = data.titleLink.content as BlockHeaderProps;
Sizes.args = data.customTitle.content as BlockHeaderProps;
