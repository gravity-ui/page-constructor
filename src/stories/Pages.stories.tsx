import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import COMMON_TYPES from './COMMON_TYPES.md';
import BLOCKS from './BLOCKS.md';
import COMPONENTS from './SUB_BLOCKS.md';
import PAGE_PROPERTIES from './PAGE_PROPERTIES.md';
import INDENTS from './INDENTS.md';

export default {
    title: 'Information',
    parameters: {
        previewTabs: {
            'storybook/docs/panel': {
                hidden: true,
            },
        },
    },
} as Meta;

export const Blocks: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: BLOCKS}} />
);
Blocks.storyName = 'Blocks';

export const Components: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMPONENTS}} />
);
Components.storyName = 'Sub-blocks';

export const CommonTypes: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMMON_TYPES}} />
);
CommonTypes.storyName = 'Common types';

export const PageProperties: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: PAGE_PROPERTIES}} />
);
PageProperties.storyName = 'Page properties';

export const Indents: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: INDENTS}} />
);
