import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, SliderBlockModel} from '../../../models';
import Slider from '../Slider';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/Slider',
    component: Slider,
} as Meta;

interface DefaultTemplateProps {
    items: SliderBlockModel[];
}

const DefaultTemplate: Story<DefaultTemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

const CardTypeTemplate: Story<DefaultTemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);
export const Default = DefaultTemplate.bind({});
export const CardType = CardTypeTemplate.bind({});

Default.args = {
    items: [
        {
            type: BlockType.SliderBlock,
            title: {text: 'Мероприятия и вебинары', url: '/events', textSize: 'l'},
            children: [
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                    border: 'line',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов 2',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                    border: 'line',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов 3',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                    border: 'line',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов 4',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                    border: 'line',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов 5',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                    border: 'line',
                },
            ],
        },
    ],
};

CardType.args = {
    items: [
        {
            type: BlockType.SliderBlock,
            title: {text: 'Карточки NewsCard', url: '/events', textSize: 'l'},
            children: [
                {
                    type: BlockType.NewsCard,
                    url: 'https://yandex.ru',
                    title: 'Размещение веб-проектов',
                    border: 'line',
                    date: '1 января 2022 г.',
                },
                {
                    type: BlockType.NewsCard,
                    url: 'https://yandex.ru',
                    title: 'Размещение веб-проектов',
                    border: 'line',
                    date: '1 января 2022 г.',
                },
                {
                    type: BlockType.NewsCard,
                    url: 'https://yandex.ru',
                    title: 'Размещение веб-проектов',
                    border: 'line',
                    date: '1 января 2022 г.',
                },
                {
                    type: BlockType.NewsCard,
                    url: 'https://yandex.ru',
                    title: 'Размещение веб-проектов',
                    border: 'line',
                    date: '1 января 2022 г.',
                },
                {
                    type: BlockType.NewsCard,
                    url: 'https://yandex.ru',
                    title: 'Размещение веб-проектов',
                    border: 'line',
                    date: '1 января 2022 г.',
                },
            ],
        },
    ],
};
