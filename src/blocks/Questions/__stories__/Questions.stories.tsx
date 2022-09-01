import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import QuestionsBlock from '../Questions';
import {BlockType, QuestionsBlockModel, QuestionItem} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import yfm from '@doc-tools/transform';

export default {
    title: 'Блоки/Questions',
    component: QuestionsBlock,
    args: {
        type: BlockType.QuestionsBlock,
        title: 'Вопросы и ответы',
        text: yfm(
            'Yandex.Cloud — публичная облачная платформа, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую **инфраструктуру**.',
        ).result.html,
        additionalInfo: yfm(
            'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое.',
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
        ],
    },
} as Meta;

const Items: QuestionItem[] = [
    {
        title: 'С какими источниками данных работает DataLens?',
        text: yfm('DataLens — это инструмент визуализации данных.').result.html,
        link: {
            url: '#',
            text: 'В документацию',
            theme: 'normal',
            arrow: true,
        },
    },
    {
        title: 'Что такое материализация данных и обязательно ли её использовать?',
        text: yfm(
            'Материализация — выгрузка данных из источника во встроенное хранилище DataLens. Материализация не обязательна при работе с базами данных. Все CSV-файлы автоматически материализуются. Все CSV-файлы автоматически материализуются.',
        ).result.html,
        link: {
            url: '#',
            text: 'В документацию',
            theme: 'normal',
            arrow: true,
        },
    },
];

const DefaultItems = Items.concat(Items).concat(Items).concat(Items);

const DefaultTemplate: Story<QuestionsBlockModel> = (args) => (
    <div style={{padding: '64px 0px'}}>
        <PageConstructor content={{blocks: [args]}} />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const TextWithListDash = DefaultTemplate.bind({});
export const TextWithListBullet = DefaultTemplate.bind({});

Default.args = {
    items: DefaultItems.map((item, i) => {
        return {
            ...item,
            title: `${item.title} ${i}`,
        };
    }),
};

TextWithListDash.args = {
    items: Items.map((item, i) => {
        return {
            ...item,
            title: `${i + 1}. Текст содержит список с тире`,
            text: yfm(
                'DataLens поддерживает работу напрямую с различными источниками:\n' +
                    '\n' +
                    '- ClickHouse\n' +
                    '\n' +
                    '- PostgreSQL\n' +
                    '\n' +
                    '- Greenplum®',
            ).result.html,
        };
    }),
};

TextWithListBullet.args = {
    items: Items.map((item, i) => {
        return {
            ...item,
            title: `${i + 1}. Текст содержит список с точками`,
            text: yfm(
                'DataLens поддерживает работу напрямую с различными источниками:\n' +
                    '\n' +
                    '- ClickHouse\n' +
                    '\n' +
                    '- PostgreSQL\n' +
                    '\n' +
                    '- Greenplum®',
            ).result.html,
            listStyle: 'disk',
        };
    }),
};
