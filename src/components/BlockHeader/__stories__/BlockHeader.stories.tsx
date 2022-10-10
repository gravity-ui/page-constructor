import {Meta, Story} from '@storybook/react/types-6-0';
import {ClassNameProps} from '../../../models';
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

export const Default = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = data.default.content as BlockHeaderProps;
TitleLink.args = data.titleLink.content as BlockHeaderProps;
CustomTitle.args = data.customTitle.content as BlockHeaderProps;
