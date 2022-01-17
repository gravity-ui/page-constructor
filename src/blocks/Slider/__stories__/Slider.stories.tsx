import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, SliderBlockModel} from '../../../models';
import Slider from '../Slider';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/Slider',
    component: Slider,
} as Meta;

const DefaultTemplate: Story<SliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);
export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Мероприятия и вебинары', url: '/events', textSize: 'l'},
    children: [
        {
            // @ts-ignore
            type: BlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            // @ts-ignore
            type: BlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 2',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            // @ts-ignore
            type: BlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 3',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            // @ts-ignore
            type: BlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 4',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            // @ts-ignore
            type: BlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 5',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
    ],
};
