import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import BLOCKS from './BLOCKS.md';
import COMMON_TYPES from './COMMON_TYPES.md';
import INDENTS from './INDENTS.md';
import PAGE_PROPERTIES from './PAGE_PROPERTIES.md';
import COMPONENTS from './SUB_BLOCKS.md';

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

export const Blocks: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: BLOCKS}} />
);
Blocks.storyName = 'Blocks';

export const Components: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMPONENTS}} />
);
Components.storyName = 'Sub-blocks';

export const CommonTypes: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMMON_TYPES}} />
);
CommonTypes.storyName = 'Common types';

export const PageProperties: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: PAGE_PROPERTIES}} />
);
PageProperties.storyName = 'Page properties';

export const Indents: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: INDENTS}} />
);
