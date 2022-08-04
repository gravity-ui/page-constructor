import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BasicCard from '../BasicCard';
import {BasicCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';
import yfm from '@doc-tools/transform';

export default {
    component: BasicCard,
    title: `${COMPONENTS}/${CARDS}/BasicCard`,
    args: {
        url: '#',
        title: 'Как развернуть 1С с кластером Microsoft SQL Server<sup>™</sup>',
        text: yfm(
            'Создайте кластер базы данных MicrosoftSQLServer^™^ самостоятельно или используйте сервис Managed Service for SQL Server^™^. Эта база данных оптимальна для работы с 1С:Предприятие.',
        ).result.html,
    },
} as Meta;

const DefaultTemplate: Story<BasicCardProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <BasicCard {...args} />
    </div>
);

const WithIconTemplate: Story<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon="https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg"
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon="https://storage.yandexcloud.net/mkt-partners/f2epus3a5oc1np9akpln.svg"
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon="https://storage.yandexcloud.net/mkt-partners/f2epus3a5oc1np9akpln.svg"
                title=""
                text={
                    yfm('Создайте кластер базы данных MicrosoftSQLServer^™^ самостоятельно.').result
                        .html
                }
            />
        </div>
    </div>
);

const WithBorderTemplate: Story<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} title="Карточка с border = shadow (по умолчанию)" />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="line" title="Карточка с border = line" />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="none" title="Карточка с border = none" />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const WithBorder = WithBorderTemplate.bind({});

Default.args = {
    text: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
    additionalInfo: yfm(
        'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
    ).result.html,
    links: [
        {
            url: '/security',
            text: 'Подробнее',
            theme: 'normal',
            arrow: true,
        },
        {
            url: '/security',
            text: 'Подробнее',
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
};
