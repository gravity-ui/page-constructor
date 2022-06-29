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

const DefaultTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SizesTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args.properties, size: 's'},
                    textContent: {title: 'Кубик размер S', ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, size: 'l'},
                    textContent: {title: 'Кубик размер L', ...args.textContent},
                },
            ],
        }}
    />
);

const ThemesTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {
                        ...args,
                        theme: 'dark',
                        background: {
                            style: {
                                backgroundColor: '#262626',
                                ...args.properties?.background?.style,
                            },
                            ...args.properties?.background,
                        },
                    },
                    textContent: {title: 'Кубик с темной монохромной темой', ...args.textContent},
                },
                {
                    ...args,
                    properties: {
                        ...args,
                        theme: 'light',
                        background: {
                            style: {
                                backgroundColor: '#CCF0D2',
                                ...args.properties?.background?.style,
                            },
                            ...args.properties?.background,
                        },
                    },
                    textContent: {title: 'Кубик со светлой монохромной темой', ...args.textContent},
                },
            ],
        }}
    />
);

const TextWidthTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args, textWidth: 's'},
                    textContent: {title: 'Ширина текста S', ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'm'},
                    textContent: {title: 'Ширина текста M', ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'l'},
                    textContent: {title: 'Ширина текста L', ...args.textContent},
                },
            ],
        }}
    />
);

const TextWidthTemplateWithoutTitle: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args, textWidth: 's'},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'm'},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'l'},
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind([]);
export const WithFiles = DefaultTemplate.bind([]);
export const Size = SizesTemplate.bind([]);
export const WithBackgroundSizeS = DefaultTemplate.bind([]);
export const WithImageAndBackgroundSizeL = DefaultTemplate.bind([]);
export const WithImageSizeLCentered = DefaultTemplate.bind([]);
export const Theme = ThemesTemplate.bind([]);
export const TextWidth = TextWidthTemplate.bind([]);
export const TextWidthWithoutTitle = TextWidthTemplateWithoutTitle.bind([]);

Default.args = {
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
};

WithFiles.args = {
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
};

Size.args = {
    type: BlockType.ContentLayoutBlock,
    textContent: {
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
};

WithBackgroundSizeS.args = {
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
};

WithImageAndBackgroundSizeL.args = {
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
};

WithImageSizeLCentered.args = {
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
};

Theme.args = {
    type: BlockType.ContentLayoutBlock,
    properties: {
        size: 's',
    },
    textContent: {
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
};

TextWidth.args = {
    type: BlockType.ContentLayoutBlock,
    properties: {
        size: 's',
    },
    textContent: {
        title: 'Ширина текста S',
        text: yfm(
            'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
        ).result.html,
        additionalInfo: yfm(
            '- Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое.\n - Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
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
};

TextWidthWithoutTitle.args = {
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
            '1. Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году.\n2. С момента запуска платформа выросла вдвое.\n3. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
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
};
