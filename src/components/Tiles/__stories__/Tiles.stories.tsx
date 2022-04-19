import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Tiles from '../Tiles';
import {TilesProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Tiles,
    title: `${COMPONENTS}/Tiles`,
} as Meta;

const DefaultTemplate: Story<TilesProps> = (args) => <Tiles {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    items: [
        {
            text: 'string',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            url: 'string',
        },
        {
            text: 'string',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            url: 'string',
        },
        {
            text: 'string',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            url: 'string',
        },
    ],
};
