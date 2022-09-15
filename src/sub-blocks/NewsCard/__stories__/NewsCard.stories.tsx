import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import NewsCard from '../NewsCard';
import {NewsCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

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

Default.args = {
    date: '9 октября 2020 г.',
    isoDate: '2020-10-08T21:00:00.000Z',
    title: 'Новое в <i>документации</i> за сентябрь',
    border: 'shadow',
    url: 'https://cloud.yandex.ru',
};
