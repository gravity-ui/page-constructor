import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import PriceDetailed from '../PriceDetailed';
import {PriceDetailedProps, PriceDetailsType, PriceLabelColor} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';
import yfm from '@doc-tools/transform';

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

MarkedList.args = {
    priceType: PriceDetailsType.MARKED_LIST,
    description: {
        titleSize: 'l',
        descriptionSize: 'm',
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
    },
    items: [
        {
            title: 'Бесплатно',
            detailedTitle: '',
            description: yfm('Для индивидуального пользования и маленьких команд').result.html,
            label: {
                color: PriceLabelColor.BLUE,
                text: 'Бесплатно',
                size: 's',
            },
            items: [
                {
                    text: yfm('до 5 пользователей').result.html,
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: yfm('Тариф действует на первые 100 пользователей').result.html,
            label: {
                color: PriceLabelColor.GREEN,
                text: 'Небольшие компании',
                size: 's',
            },
            items: [
                {
                    text: yfm('до 100 пользователей').result.html,
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: yfm('Тариф действует на первые 100 пользователей').result.html,
            label: {
                color: PriceLabelColor.GREEN,
                size: 's',
            },
            items: [
                {
                    text: yfm('до 100 пользователей').result.html,
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
            description: yfm('Для индивидуального пользования и маленьких команд').result.html,
            label: {
                color: PriceLabelColor.BLUE,
                text: 'Бесплатно',
                size: 's',
            },
            items: [
                {
                    title: 'до 5 пользователей',
                    description: yfm('до 5 пользователей').result.html,
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: yfm('Тариф действует на первые 100 пользователей').result.html,
            label: {
                color: PriceLabelColor.GREEN,
                text: 'Небольшие компании',
                size: 's',
            },
            items: [
                {
                    title: 'до 5 пользователей',
                    description: yfm('до 5 пользователей').result.html,
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: yfm('Тариф действует на первые 100 пользователей').result.html,
            label: {
                color: PriceLabelColor.GREEN,
                size: 's',
            },
            items: [
                {
                    title: 'до 5 пользователей',
                    description: yfm('до 5 пользователей').result.html,
                },
            ],
        },
    ],
};

WithBlackText.args = {
    priceType: PriceDetailsType.MARKED_LIST,
    description: {
        titleSize: 'l',
        descriptionSize: 'm',
        titleColor: 'black',
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
        titleColor: 'black',
    },
    items: [
        {
            title: 'Бесплатно',
            detailedTitle: '',
            description: yfm('Для индивидуального пользования и маленьких команд').result.html,
            label: {
                color: PriceLabelColor.BLUE,
                text: 'Бесплатно',
                size: 's',
            },
            items: [
                {
                    text: yfm('до 5 пользователей').result.html,
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: yfm('Тариф действует на первые 100 пользователей').result.html,
            label: {
                color: PriceLabelColor.GREEN,
                text: 'Небольшие компании',
                size: 's',
            },
            items: [
                {
                    text: yfm('до 100 пользователей').result.html,
                },
            ],
        },
        {
            title: '258 ₽',
            detailedTitle: '/ месяц*',
            description: yfm('Тариф действует на первые 100 пользователей').result.html,
            label: {
                color: PriceLabelColor.GREEN,
                size: 's',
            },
            items: [
                {
                    text: yfm('до 100 пользователей').result.html,
                },
            ],
        },
    ],
};
