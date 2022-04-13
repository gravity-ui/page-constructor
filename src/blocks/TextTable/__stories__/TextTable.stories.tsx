import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import TextTable from '../TextTable';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {BlockType, TextTableBlockModel} from '../../../models';

export default {
    component: TextTable,
    title: 'Блоки/TextTable',
} as Meta;

const DefaultTemplate: Story<TextTableBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.TextTableBlock,
    title: {
        text: 'string',
        navTitle: 'string',
        anchor: 'string',
    },
    description:
        'Вы можете развернуть свои проекты в трёх географически распределённых дата-центрах — на их основе работают сайты и приложения самого <a href="yandex.ru">Яндекса</a>.',
    button: {
        text: 'btn',
        url: '#',
    },
    content: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
};
