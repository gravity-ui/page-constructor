import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PriceDetailedProps} from '../../../models';
import PriceDetailed from '../PriceDetailed';

import data from './data.json';

export default {
    component: PriceDetailed,
    title: 'Components/Cards/PriceDetailed',
} as Meta;

const DefaultTemplate: StoryFn<PriceDetailedProps> = (args) => (
    <div style={{maxWidth: '1000px'}}>
        <PriceDetailed {...args} />
    </div>
);

export const MarkedList = DefaultTemplate.bind({});
export const Settings = DefaultTemplate.bind({});
export const WithBlackText = DefaultTemplate.bind({});

MarkedList.args = data.markedList.content as PriceDetailedProps;
Settings.args = data.settings.content as PriceDetailedProps;
WithBlackText.args = data.withBlackText.content as PriceDetailedProps;
