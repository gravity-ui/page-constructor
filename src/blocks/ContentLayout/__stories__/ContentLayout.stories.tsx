import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, ContentLayoutBlockModel} from '../../../models';
import Content from '../ContentLayout';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/ContentLayout',
    component: Content,
} as Meta;

interface TemplateProps {
    items: ContentLayoutBlockModel[];
}

const DefaultTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

const WithFilesTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

export const Default = DefaultTemplate.bind([]);
export const WithFiles = WithFilesTemplate.bind([]);

Default.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            textContent: {
                title: 'Программа содействия образованию и науке в области Computer Science',
                text: '<p>Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.</p>',
                additionalInfo:
                    '<p>Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более <a href="#">10 тысяч компаний</a>.</p>',
                link: {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                buttons: [
                    {
                        text: 'Подключиться',
                        theme: 'action',
                        // theme: 'normal-contrast', // dark-theme
                        url: 'https://console.cloud.yandex.${tld}/',
                    },
                    {
                        text: 'Связаться с нами',
                        theme: 'outlined',
                        // theme: 'outlined-contrast', // dark-theme
                        url: '/#contact-form',
                    },
                ],
            },
        },
    ],
};

WithFiles.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            textContent: {
                title: 'Программа содействия образованию и науке в области Computer Science',
                text: 'Yandex.Cloud — публичная облачная платформа, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                additionalInfo:
                    'Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                link: {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                buttons: [
                    {
                        text: 'Подключиться',
                        theme: 'action',
                        // theme: 'normal-contrast', // dark-theme
                        url: 'https://console.cloud.yandex.${tld}/',
                    },
                    {
                        text: 'Связаться с нами',
                        theme: 'outlined',
                        // theme: 'outlined-contrast', // dark-theme
                        url: '/#contact-form',
                    },
                ],
            },
            fileContent: [
                {
                    href: 'https://yandex.xls',
                    text: 'Аттестат соответствия (600 КБ)',
                },
                {
                    href: 'https://yandex.fig',
                    text: 'Форматы PNG, JPG, SVG в Figma',
                },
                {
                    href: 'https://yandex.pdf',
                    text: 'Требования и рекомендации для построения PCI DSS (1,3 МБ)',
                },
                {
                    href: 'https://yandex.zip',
                    text: 'Архив с другими форматами логотипа и иконки',
                },
                {
                    href: 'https://yandex.doc',
                    text: 'Документ Microsoft Word',
                },
                {
                    href: 'https://yandex.ppt',
                    text: 'PPR',
                },
            ],
        },
    ],
};
