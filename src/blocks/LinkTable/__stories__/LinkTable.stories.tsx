import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import LinkTable from '../LinkTable';
import {BlockType, LinkTableBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    component: LinkTable,
    title: 'Блоки/LinkTable',
} as Meta;

const DefaultTemplate: Story<LinkTableBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const DefaultLinksOneColumn = DefaultTemplate.bind({});
export const ThreeColumn = DefaultTemplate.bind({});
export const FileLinksTheme = DefaultTemplate.bind({});
export const UnderlineTheme = DefaultTemplate.bind({});
export const BackTheme = DefaultTemplate.bind({});

DefaultLinksOneColumn.args = {
    type: BlockType.LinkTableBlock,
    title: 'Соответствие стандартам',
    description:
        'Мы постоянно <b>совершенствуем</b> процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
    linkTheme: 'normal',
    items: [
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
    ],
};

ThreeColumn.args = {
    type: BlockType.LinkTableBlock,
    title: 'Соответствие стандартам',
    description:
        'Мы постоянно <b>совершенствуем</b> процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
    items: [
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
                arrow: true,
            },
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
        [
            {
                text: 'Ссылка',
                url: '#',
                theme: 'underline',
            },
        ],
        [
            {
                text: 'Подробнее',
                url: '#',
                theme: 'underline',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
    ],
};

FileLinksTheme.args = {
    type: BlockType.LinkTableBlock,
    linkTheme: 'file-link',
    title: 'Соответствие стандартам',
    description:
        'Мы постоянно <b>совершенствуем</b> процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
    items: [
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
        [
            {
                text: 'Ссылка',
                url: '#',
            },
        ],
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
    ],
};

UnderlineTheme.args = {
    type: BlockType.LinkTableBlock,
    linkTheme: 'underline',
    title: 'Соответствие стандартам',
    description:
        'Мы постоянно <b>совершенствуем</b> процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
    items: [
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
        [
            {
                text: 'Ссылка',
                url: '#',
            },
        ],
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
    ],
};

BackTheme.args = {
    type: BlockType.LinkTableBlock,
    linkTheme: 'back',
    title: 'Соответствие стандартам',
    description:
        'Мы постоянно <b>совершенствуем</b> процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
    items: [
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
        [
            {
                text: 'Ссылка',
                url: '#',
            },
        ],
        [
            {
                text: 'Подробнее',
                url: '#',
            },
            {
                text: 'Читать далее',
                url: '#',
            },
        ],
    ],
};
