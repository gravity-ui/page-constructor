import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, ContentLayoutBlockModel} from '../../../models';
import Content from '../ContentLayout';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import yfm from '@doc-tools/transform';

export default {
    title: 'Блоки/ContentLayout',
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

const TextWidthTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

const TextWidthWithoutTitleTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

export const Default = DefaultTemplate.bind([]);
export const WithFiles = WithFilesTemplate.bind([]);
export const Size = SizeTemplate.bind([]);
export const Background = BackgroundTemplate.bind([]);
export const Theme = ThemeTemplate.bind([]);
export const TextWidth = TextWidthTemplate.bind([]);
export const TextWidthWithoutTitle = TextWidthWithoutTitleTemplate.bind([]);

Default.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            textContent: {
                title: 'Программа содействия образованию и науке в области Computer Science',
                text: yfm(
                    '### Yandex.Cloud \n #### Yandex.Cloud \n — публичная облачная платформа которая [представил](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
            },
        },
    ],
};

WithFiles.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            textContent: {
                title: {
                    text: 'Программа содействия образованию и науке в области Computer Science',
                    url: 'https://yandex.ru',
                },
                text: yfm(
                    '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'back',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа которая [представил](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [представил](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                title: 'Кубик размера S с темной монохромной темой',
                text: yfm(
                    '### Yandex.Cloud \n #### Yandex.Cloud \n — публичная облачная платформа которая [представил](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                ],
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
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                theme: 'light',
                background: {
                    style: {
                        backgroundColor: '#CCF0D2',
                    },
                },
            },
            textContent: {
                title: 'Кубик размера L со светлой монохромной темой',
                text: yfm(
                    '### Yandex.Cloud \n #### Yandex.Cloud \n — публичная облачная платформа которая [представил](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
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
                ],
                buttons: [
                    {
                        text: 'Подключиться',
                        theme: 'monochrome',
                        url: 'https://console.cloud.yandex.${tld}/',
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

TextWidth.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                textWidth: 's',
                size: 's',
            },
            textContent: {
                title: 'Ширина текста S',
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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
                textWidth: 'm',
            },
            textContent: {
                title: 'Ширина текста M - дефотлная, её можно не указывать',
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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
                textWidth: 'l',
            },
            textContent: {
                title: 'Ширина текста L',
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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

TextWidthWithoutTitle.args = {
    items: [
        {
            type: BlockType.ContentLayoutBlock,
            properties: {
                textWidth: 's',
                size: 's',
            },
            textContent: {
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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
                textWidth: 'm',
            },
            textContent: {
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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
                textWidth: 'l',
            },
            textContent: {
                text: yfm(
                    'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
                ).result.html,
                additionalInfo: yfm(
                    'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
                ).result.html,
                links: [
                    {
                        url: '/security',
                        text: 'Заполнить форму',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#1',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#2',
                        text: 'Подробнее',
                        theme: 'normal',
                        arrow: true,
                    },
                    {
                        url: '#3',
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
