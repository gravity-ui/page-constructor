import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, ExtendedFeaturesBlockModel} from '../../../models';
import ExtendedFeatures from '../ExtendedFeatures';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/ExtendedFeatures',
    component: ExtendedFeatures,
} as Meta;

const DefaultTemplate: Story<ExtendedFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);
export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.ExtendedFeaturesBlock,
    title: {text: 'Развивайте идеи без лишних трат', textSize: 'm'},
    items: [
        {
            title: 'Грант на знакомство с платформой',
            text: '<a href="/docs/free-trial/">Грант на знакомство с платформой</a> — не менее 4000 рублей — вы получите уже при создании платёжного аккаунта. Эту сумму можно тратить на облачные сервисы Yandex.Cloud в течение двух месяцев.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            link: {
                text: 'Перейти',
                url: '#',
                arrow: true,
                theme: 'normal',
            },
        },
        {
            title: 'Выгодные тарифы и free tier',
            text: 'От 116 рублей в месяц за аренду виртуальной машины, от 530 рублей — за кластер управляемой базы данных. Небольшой сайт, приложение или сервис можно разместить бесплатно, используя <a href="/docs/billing/concepts/serverless-free-tier">free tier экосистемы бессерверных вычислений</a>.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/calc.svg',
            link: {
                text: 'Перейти',
                url: '#',
                arrow: true,
                theme: 'normal',
            },
        },
        {
            title: 'Прозрачное ценообразование и скидки',
            text: 'В Yandex.Cloud вы всегда знаете, сколько потратите и как будет расходоваться бюджет. Зарезервируйте ресурсы заранее — на 1 или 3 года, и сэкономьте до 49%. Если уверены в прогнозе нагрузок, <a href="#contact-form">напишите в отдел продаж</a>.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/proc.svg',
            link: {
                text: 'Перейти',
                url: '#',
                arrow: true,
                theme: 'normal',
            },
        },
    ],
};

WithLabel.args = {
    type: BlockType.ExtendedFeaturesBlock,
    title: {text: 'Развивайте идеи без лишних трат', textSize: 'm'},
    items: [
        {
            title: 'Грант на знакомство с платформой',
            text: '<a href="/docs/free-trial/">Грант на знакомство с платформой</a> — не менее 4000 рублей — вы получите уже при создании платёжного аккаунта. Эту сумму можно тратить на облачные сервисы Yandex.Cloud в течение двух месяцев.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            link: {
                text: 'Перейти',
                url: '#',
                arrow: true,
                theme: 'normal',
            },
            label: 'New',
        },
        {
            title: 'Выгодные тарифы и free tier',
            text: 'От 116 рублей в месяц за аренду виртуальной машины, от 530 рублей — за кластер управляемой базы данных. Небольшой сайт, приложение или сервис можно разместить бесплатно, используя <a href="/docs/billing/concepts/serverless-free-tier">free tier экосистемы бессерверных вычислений</a>.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/calc.svg',
            link: {
                text: 'Перейти',
                url: '#',
                arrow: true,
                theme: 'normal',
            },
            label: 'Preview',
        },
        {
            title: 'Прозрачное ценообразование и скидки',
            text: 'В Yandex.Cloud вы всегда знаете, сколько потратите и как будет расходоваться бюджет. Зарезервируйте ресурсы заранее — на 1 или 3 года, и сэкономьте до 49%. Если уверены в прогнозе нагрузок, <a href="#contact-form">напишите в отдел продаж</a>.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/proc.svg',
            link: {
                text: 'Перейти',
                url: '#',
                arrow: true,
                theme: 'normal',
            },
            label: 'New',
        },
    ],
};
