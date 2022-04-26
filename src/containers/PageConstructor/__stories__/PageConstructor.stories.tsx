import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, HeaderBlockModel} from '../../../models';
import {PageConstructor} from '../PageConstructor';
import yfm from '@doc-tools/transform';
import {CONTAINERS} from '../../../demo/constants';

export default {
    title: `${CONTAINERS}/PageConstructor`,
    component: PageConstructor,
} as Meta;

interface TemplateProps {
    items: HeaderBlockModel[];
}

const WithBackgroundTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
            background: {
                light: {
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-compscience-new.png',
                },
                dark: {
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-education-blue.png',
                },
            },
        }}
    />
);

const WithFootnotesTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor
        content={{
            blocks: args.items,
            background: {
                light: {
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-compscience-new.png',
                },
                dark: {
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-education-blue.png',
                },
            },
            footnotes: [
                yfm('ClickHouse is a trademark of ClickHouse, Inc. https://clickhouse.com').result
                    .html,
                yfm(
                    'Apache® and Apache Kafka® are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries.',
                ).result.html,
            ],
        }}
    />
);

export const WithTheme = WithBackgroundTemplate.bind({});
export const WithFootnotes = WithFootnotesTemplate.bind({});

WithTheme.args = {
    items: [
        {
            type: BlockType.HeaderBlock,
            title: 'Партнёрская программа Yandex Cloud Professionals',
            description: yfm(
                'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
            ).result.html,
            width: 'm',
            verticalOffset: 'm',
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
        },
    ],
};

WithFootnotes.args = {
    items: [
        {
            type: BlockType.HeaderBlock,
            title: 'Партнёрская программа Yandex Cloud Professionals',
            description: yfm(
                'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
            ).result.html,
            width: 'm',
            verticalOffset: 'm',
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
        },
    ],
};
