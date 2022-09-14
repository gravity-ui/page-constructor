import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Security from '../Security';
import {BlockType, SecurityBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor';

export default {
    title: 'Blocks/Security',
    component: Security,
    args: {
        theme: 'dark',
    },
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: Story<SecurityBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const DarkTheme = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});
export const CustomBackground = DefaultTemplate.bind({});

DarkTheme.args = {
    type: BlockType.SecurityBlock,
    title: 'Данные хранятся надёжно и безопасно',
    media: {
        youtube: 'https://www.youtube.com/embed/xbNPpD43uvE?color=white&rel=0',
    },
    points: [
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/mailn-availability-zones.svg',
            text: 'Вы можете развернуть свои проекты в трёх географически распределённых дата-центрах — на их основе работают сайты и приложения самого <a href="yandex.ru">Яндекса</a>.',
            link: {
                text: 'Подробнее',
                url: '#',
            },
        },
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-datacenter.svg',
            text: 'Серверные стойки для дата-центров мы проектируем и собираем сами так, чтобы они могли выдержать любую нагрузку.',
            link: {
                text: 'Подробнее',
                url: '#',
            },
        },
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-secure-clouds.svg',
            text: 'Наша платформа соответствует требованиям о хранении персональных данных PCI DSS, GDPR, 152-ФЗ РФ и индустриальных стандартов ISO.',
            link: {
                text: 'Сертификаты и стандарты',
                url: '#',
            },
        },
    ],
};

LightTheme.args = {
    type: BlockType.SecurityBlock,
    title: 'Данные хранятся надёжно и безопасно',
    theme: 'light',
    media: {
        youtube: 'https://www.youtube.com/embed/xbNPpD43uvE?color=white&rel=0',
    },
    points: [
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/mailn-availability-zones.svg',
            text: 'Вы можете развернуть свои проекты в трёх географически распределённых дата-центрах — на их основе работают сайты и приложения самого <a href="yandex.ru">Яндекса</a>.',
            link: {
                text: 'Подробнее',
                url: '#',
            },
        },
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-datacenter.svg',
            text: 'Серверные стойки для дата-центров мы проектируем и собираем сами так, чтобы они могли выдержать любую нагрузку.',
            link: {
                text: 'Подробнее',
                url: '#',
            },
        },
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-secure-clouds.svg',
            text: 'Наша платформа соответствует требованиям о хранении персональных данных PCI DSS, GDPR, 152-ФЗ РФ и индустриальных стандартов ISO.',
            link: {
                text: 'Сертификаты и стандарты',
                url: '#',
            },
        },
    ],
};

CustomBackground.args = {
    type: BlockType.SecurityBlock,
    title: 'Данные хранятся надёжно и безопасно',
    backgroundColor: '#7ccea0',
    media: {
        youtube: 'https://www.youtube.com/embed/xbNPpD43uvE?color=white&rel=0',
    },
    points: [
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/mailn-availability-zones.svg',
            text: 'Вы можете развернуть свои проекты в трёх географически распределённых дата-центрах — на их основе работают сайты и приложения самого <a href="yandex.ru">Яндекса</a>.',
            link: {
                text: 'Подробнее',
                url: '#',
            },
        },
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-datacenter.svg',
            text: 'Серверные стойки для дата-центров мы проектируем и собираем сами так, чтобы они могли выдержать любую нагрузку.',
            link: {
                text: 'Подробнее',
                url: '#',
            },
        },
        {
            img: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-secure-clouds.svg',
            text: 'Наша платформа соответствует требованиям о хранении персональных данных PCI DSS, GDPR, 152-ФЗ РФ и индустриальных стандартов ISO.',
            link: {
                text: 'Сертификаты и стандарты',
                url: '#',
            },
        },
    ],
};
