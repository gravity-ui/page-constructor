import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CARDS, COMPONENTS} from '../../../demo/constants';
import {PriceDetailedProps} from '../../../models';
import PriceDetailed from '../PriceDetailed';

import data from './data.json';

export default {
    component: PriceDetailed,
    title: `${COMPONENTS}/${CARDS}/PriceDetailed`,
} as Meta;

const DefaultTemplate: Story<PriceDetailedProps> = (args) => (
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
