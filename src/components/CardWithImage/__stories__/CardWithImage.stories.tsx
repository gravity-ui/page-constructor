import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import CardWithImage from '../CardWithImage';
import {CardWithImageProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

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

Default.args = {
    image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
    title: 'Программа содействия образованию и науке в области Computer Science',
    fullScreen: true,
    border: true,
    links: [
        {
            link: '/security',
            title: 'Заполнить форму',
            theme: 'back',
            arrow: true,
        },
        {
            link: '#',
            title: 'Подробнее',
            theme: 'normal',
            arrow: true,
        },
    ],
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            url: '/#contact-form',
        },
    ],
    description: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
    additionalInfo: yfm(
        'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
    ).result.html,
};

TitleWithLink.args = {
    image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
    title: {
        text: 'Программа содействия образованию и науке в области Computer Science',
        url: 'https://yandex.ru',
        textSize: 's',
    },
    fullScreen: true,
    border: true,
    links: [
        {
            link: '/security',
            title: 'Заполнить форму',
            theme: 'back',
            arrow: true,
        },
        {
            link: '#',
            title: 'Подробнее',
            theme: 'normal',
            arrow: true,
        },
    ],
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            url: '/#contact-form',
        },
    ],
    description: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
    additionalInfo: yfm(
        'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
    ).result.html,
};

FullScreen.args = {
    image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
    title: 'Перераспределение нагрузки',
    description:
        'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
    fullScreen: true,
    border: true,
};
