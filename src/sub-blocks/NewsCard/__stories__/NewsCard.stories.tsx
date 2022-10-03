import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import NewsCard from '../NewsCard';
import {NewsCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: NewsCard,
    title: `${COMPONENTS}/${CARDS}/NewsCard`,
} as Meta;

const DefaultTemplate: Story<NewsCardProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <NewsCard {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as NewsCardProps;
