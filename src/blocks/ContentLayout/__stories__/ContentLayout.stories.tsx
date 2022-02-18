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

const SizeTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

const BackgroundTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

const ThemeTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

export const Default = DefaultTemplate.bind([]);
export const WithFiles = WithFilesTemplate.bind([]);
export const Size = SizeTemplate.bind([]);
export const Background = BackgroundTemplate.bind([]);
export const Theme = ThemeTemplate.bind([]);

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

Size.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                size: 's',
            },
            textContent: {
                title: 'Кубик размер S',
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
        {
            type: BlockType.ContentLayoutBlock,
            textContent: {
                title: 'Кубик размер L',
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

Background.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                size: 's',
                background: {
                    style: {
                        backgroundColor: '#EFF2F8',
                    },
                },
            },
            textContent: {
                title: 'Кубик размер S с фоном',
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
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                background: {
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/edu/edu_sol_mtrl-new.png',
                    style: {
                        backgroundColor: '#EFF2F8',
                    },
                },
            },
            textContent: {
                title: 'Кубик размер L с фоном и картинкой',
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
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                size: 's',
                background: {
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/solutions_background.svg',
                },
                centered: true,
            },
            textContent: {
                title: 'Кубик размер S с картинкой, выравнивание по центру',
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

Theme.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                theme: 'dark',
                size: 's',
                background: {
                    style: {
                        backgroundColor: '#262626',
                    },
                },
            },
            textContent: {
                title: 'Кубик с темой для темного фона',
                text: 'Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                additionalInfo:
                    'Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более <a href="#">10 тысяч компаний.</a>',
                link: {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                buttons: [
                    {
                        text: 'Подключиться',
                        theme: 'normal-contrast',
                        url: 'https://console.cloud.yandex.${tld}/',
                    },
                    {
                        text: 'Связаться с нами',
                        theme: 'outlined-contrast',
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
