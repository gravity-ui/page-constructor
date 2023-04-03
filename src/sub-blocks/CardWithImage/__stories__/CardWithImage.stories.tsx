import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CARDS, COMPONENTS} from '../../../demo/constants';
import {CardWithImageProps} from '../../../models';
import CardWithImage from '../CardWithImage';

import data from './data.json';

export default {
    title: `${COMPONENTS}/${CARDS}/CardWithImage`,
    component: CardWithImage,
} as Meta;

const DefaultTemplate: Story<CardWithImageProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <CardWithImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});
export const FullScreen = DefaultTemplate.bind({});

Default.args = data.default.content as CardWithImageProps;
FullScreen.args = data.fullScreen.content as CardWithImageProps;
