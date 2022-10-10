import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import CardWithImage from '../CardWithImage';
import {CardWithImageProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

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
export const TitleWithLink = DefaultTemplate.bind({});
export const FullScreen = DefaultTemplate.bind({});

Default.args = data.default.content as CardWithImageProps;
TitleWithLink.args = data.titleWithLink.content as CardWithImageProps;
FullScreen.args = data.fullScreen.content as CardWithImageProps;
