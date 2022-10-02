import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {PartnerProps} from '../../../models';
import Partner from '../Partner';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Partner,
    title: `${COMPONENTS}/${CARDS}/Partner`,
} as Meta;

const DefaultTemplate: Story<PartnerProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <Partner {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as PartnerProps;
