import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {MarqueeLinksBlockModel, MarqueeLinksBlockProps} from '../../../models';
import MarqueeLinksBlock from '../MarqueeLinks';

import data from './data.json';

export default {
    title: 'Blocks/MarqueeLinks',
    component: MarqueeLinksBlock,
} as Meta;

const DefaultTemplate: StoryFn<MarqueeLinksBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as MarqueeLinksBlockProps;
