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
            title: {text: 'Мероприятия и вебинары', url: '/events'},
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
            title: {text: 'Карточки NewsCard', url: '/events'},
            children: [
                {
                    type: BlockType.NewsCard,
                    url: 'https://yandex.ru',
                    title: 'Размещение веб-проектов',
                    border: 'line',
                    date: '1 января 2022 г.',
                    isoDate: '2020-04-06T09:56:21.192Z',
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
        {
            type: BlockType.SliderBlock,
            title: {text: 'Карточки TutorialCard', url: '/events'},
            children: [
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов 1',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    title: 'Размещение веб-проектов 2',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
                    title: 'Размещение веб-проектов 3',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                },
                {
                    type: BlockType.TutorialCard,
                    url: 'string',
                    icon: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
                    },
                    title: 'Размещение веб-проектов 7',
                    text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
                },
            ],
        },
        {
            type: BlockType.SliderBlock,
            title: {text: 'Карточки QuoteCard', url: '/events'},
            slidesToShow: 1,
            children: [
                {
                    type: BlockType.Quote,
                    text: 'Мы&nbsp;выбрали Yandex.Cloud за зрелость, потенциал и возможность совместного развития. Для нас облако — это возможность получить ген масштабируемости и внедрить его в ДНК нашего бизнеса',
                    image: {
                        light: {
                            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/ecommerce-big.png',
                        },
                        dark: {
                            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/retail-banner.png',
                        },
                    },
                    url: 'https://cloud.yandex.ru/cases/leroymerlin',
                    author: {
                        firstName: 'Дмитрий',
                        secondName: 'Шостко',
                        description: 'Chief Data Officer «Леруа Мерлен Восток»',
                        avatar: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-yuri-1.jpg',
                    },
                    logo: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/companies_logo/leroymerlin.svg',
                },
                {
                    type: BlockType.Quote,
                    text: 'Moderating content for children is a very sensitive and difficult topic. Our solution using Yandex Cloud advanced technologies speeds up content processing and significantly reduces reputational risks',
                    logo: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/use-cases-logo-eng/X5Group-logo-eng.svg',
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/yode-group/yode-group_screen_2.png',
                    theme: 'dark',
                    color: 'darkgreen',
                    url: 'https://cloud.yandex.ru/cases/leroymerlin',
                    buttonText: 'Читать также',
                    author: {
                        firstName: 'Mikhail',
                        secondName: 'Yartsev',
                        avatar: 'https://storage.yandexcloud.net/cloud-www-assets/cases/yode-group/yode-group_screen_2.png',
                    },
                },
                {
                    type: BlockType.Quote,
                    text: "We have an infrastructure that can be scaled up in just an hour and then scaled down just as quickly. And this doesn't require a huge budget, approval for purchasing hardware, or maintenance costs",
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/mvideo/mvideo_screen_1.png',
                    url: 'https://cloud.yandex.ru/cases/genotek',
                    logo: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/use-cases-logo-eng/MVideo-logo-eng.svg',
                },
                {
                    type: BlockType.Quote,
                    text: 'Yandex Cloud helped us make a clear connection between external events and sales dynamics in retail outlets. We correlated online advertising with offline sales, and we even figured out why product quality changed depending on the specific equipment it passed through in the production process',
                    logo: 'https://storage.yandexcloud.net/cloud-www-assets/cases/okraina/okraina_logo1.svg',
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/okraina/okraina_cover.jpg',
                    author: {
                        firstName: 'Валерий',
                        secondName: 'Ильинский',
                        description: 'генеральный директор Genotek',
                    },
                },
            ],
        },
    ],
};
