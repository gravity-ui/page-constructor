import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import AnimateBlock, {AnimateBlockProps} from '../AnimateBlock';

import './AnimateBlock.stories.scss';

export default {
    component: AnimateBlock,
    title: `${COMPONENTS}/AnimateBlock`,
} as Meta;

const DefaultTemplate: Story<AnimateBlockProps> = (args) => (
    <AnimateBlock {...args} className="animate-block-stories">
        <div className={'animate-block-stories__block'}>{'children'}</div>
    </AnimateBlock>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    animate: true,
};
