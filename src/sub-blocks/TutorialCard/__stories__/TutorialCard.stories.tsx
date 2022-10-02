import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import TutorialCard from '../TutorialCard';
import {TutorialCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: TutorialCard,
    title: `${COMPONENTS}/${CARDS}/TutorialCard`,
} as Meta;

const DefaultTemplate: Story<TutorialCardProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <TutorialCard {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as TutorialCardProps;
