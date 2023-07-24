import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import AnimateBlock, {AnimateBlockProps} from '../AnimateBlock';

import './AnimateBlock.stories.scss';

export default {
    component: AnimateBlock,
    title: 'Components/AnimateBlock',
} as Meta;

const DefaultTemplate: StoryFn<AnimateBlockProps> = (args) => (
    <AnimateBlock {...args} className="animate-block-stories">
        <div className={'animate-block-stories__block'}>{'children'}</div>
    </AnimateBlock>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    animate: true,
};
