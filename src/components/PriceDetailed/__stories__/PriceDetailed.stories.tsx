import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import PriceDetailed from '../PriceDetailed';
import {PriceDetailedProps, PriceDetailsType, PriceLabelColor} from '../../../models';
import {CARDS, COMPONENTS} from '../../../constants';

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

MarkedList.args = {
    priceType: PriceDetailsType.MARKED_LIST,
    description: {
        titleSize: 'l',
        descriptionSize: 'm',
        titleColor: 'cornflower',
    },
    details: {
        titleSize: 's',
        descriptionSize: 'm',
    },
    labelsDefaultText: {
        [PriceLabelColor.BLUE]: 'label по умолчанию',
        [PriceLabelColor.GREEN]: 'label по умолчанию',
        [PriceLabelColor.YELLOW]: 'label по умолчанию',
        [PriceLabelColor.PURPLE]: 'label по умолчанию',
        [PriceLabelColor.RED]: 'label по умолчанию',
    },
    foldable: {
        title: 'Открыть',
        size: 's',
        titleColor: 'cornflower',
    },
    items: [
        {
            title: 'Бесплатно',
            detailedTitle: '',
            description: 'Для индивидуального пользования и маленьких команд',
            label: {
                color: PriceLabelColor.BLUE,
                text: 'Бесплатно',
                size: 's',
            },
            items: [
                {
                    text: 'до 5 пользователей',
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: 'Тариф действует на первые 100 пользователей',
            label: {
                color: PriceLabelColor.GREEN,
                text: 'Небольшие компании',
                size: 's',
            },
            items: [
                {
                    text: 'до 100 пользователей',
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: 'Тариф действует на первые 100 пользователей',
            label: {
                color: PriceLabelColor.GREEN,
                size: 's',
            },
            items: [
                {
                    text: 'до 100 пользователей',
                },
            ],
        },
    ],
};

Settings.args = {
    priceType: PriceDetailsType.SETTINGS,
    description: {
        titleSize: 'l',
        descriptionSize: 'm',
        titleColor: 'cornflower',
    },
    details: {
        titleSize: 's',
        descriptionSize: 'm',
    },
    labelsDefaultText: {
        [PriceLabelColor.BLUE]: 'label по умолчанию',
        [PriceLabelColor.GREEN]: 'label по умолчанию',
        [PriceLabelColor.YELLOW]: 'label по умолчанию',
        [PriceLabelColor.PURPLE]: 'label по умолчанию',
        [PriceLabelColor.RED]: 'label по умолчанию',
    },
    items: [
        {
            title: 'Бесплатно',
            detailedTitle: '',
            description: 'Для индивидуального пользования и маленьких команд',
            label: {
                color: PriceLabelColor.BLUE,
                text: 'Бесплатно',
                size: 's',
            },
            items: [
                {
                    title: 'до 5 пользователей',
                    description: 'до 5 пользователей',
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: 'Тариф действует на первые 100 пользователей',
            label: {
                color: PriceLabelColor.GREEN,
                text: 'Небольшие компании',
                size: 's',
            },
            items: [
                {
                    title: 'до 5 пользователей',
                    description: 'до 5 пользователей',
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: 'Тариф действует на первые 100 пользователей',
            label: {
                color: PriceLabelColor.GREEN,
                size: 's',
            },
            items: [
                {
                    title: 'до 5 пользователей',
                    description: 'до 5 пользователей',
                },
            ],
        },
    ],
};
