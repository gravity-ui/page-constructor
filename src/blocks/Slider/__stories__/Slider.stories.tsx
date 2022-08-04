import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, SubBlockType, SliderBlockModel} from '../../../models';
import Slider from '../Slider';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import yfm from '@doc-tools/transform';

export default {
    title: 'Блоки/Slider',
    component: Slider,
    args: {
        dots: true,
        disclaimer: undefined,
        adaptive: undefined,
        randomOrder: undefined,
    },
    argTypes: {
        description: {control: 'text'},
        autoplay: {control: 'number'},
        adaptive: {control: 'boolean'},
        randomOrder: {control: 'boolean'},
    },
} as Meta;

const DefaultTemplate: Story<SliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const NewsCards = DefaultTemplate.bind({});
export const TutorialCards = DefaultTemplate.bind({});
export const QuoteCards = DefaultTemplate.bind({});
export const Banners = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Мероприятия и вебинары', url: '/events'},
    children: [
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 2',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 3',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 4',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 5',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
            border: 'line',
        },
    ],
};

NewsCards.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Карточки NewsCard', url: '/events'},
    children: [
        {
            type: SubBlockType.NewsCard,
            url: 'https://yandex.ru',
            title: 'Размещение веб-проектов',
            border: 'line',
            date: '1 января 2022 г.',
            isoDate: '2020-04-06T09:56:21.192Z',
        },
        {
            type: SubBlockType.NewsCard,
            url: 'https://yandex.ru',
            title: 'Размещение веб-проектов',
            border: 'line',
            date: '1 января 2022 г.',
        },
        {
            type: SubBlockType.NewsCard,
            url: 'https://yandex.ru',
            title: 'Размещение веб-проектов',
            border: 'line',
            date: '1 января 2022 г.',
        },
        {
            type: SubBlockType.NewsCard,
            url: 'https://yandex.ru',
            title: 'Размещение веб-проектов',
            border: 'line',
            date: '1 января 2022 г.',
        },
        {
            type: SubBlockType.NewsCard,
            url: 'https://yandex.ru',
            title: 'Размещение веб-проектов',
            border: 'line',
            date: '1 января 2022 г.',
        },
    ],
};

TutorialCards.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Карточки TutorialCard', url: '/events'},
    children: [
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 1',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            title: 'Размещение веб-проектов 2',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            title: 'Размещение веб-проектов 3',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
        },
        {
            type: SubBlockType.TutorialCard,
            url: 'string',
            icon: {
                src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
            },
            title: 'Размещение веб-проектов 7',
            text: 'Если разместить сайт в Yandex.Cloud, то в дальнейшем инфраструктуру будет проще масштабировать под меняющиеся условия. Например, вы сможете быстро перестроить её при увеличении числа пользователей и убедиться, что сайт останется доступен всем желающим. К тому же, мы гарантируем безопасность вашего сайта: в Yandex Compute Cloud есть компонент, защищающий от DDoS-атак.',
        },
    ],
};

QuoteCards.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Карточки QuoteCard', url: '/events'},
    slidesToShow: 1,
    arrows: true,
    children: [
        {
            type: SubBlockType.Quote,
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
            type: SubBlockType.Quote,
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
            type: SubBlockType.Quote,
            text: "We have an infrastructure that can be scaled up in just an hour and then scaled down just as quickly. And this doesn't require a huge budget, approval for purchasing hardware, or maintenance costs",
            image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/mvideo/mvideo_screen_1.png',
            url: 'https://cloud.yandex.ru/cases/genotek',
            logo: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/use-cases-logo-eng/MVideo-logo-eng.svg',
        },
        {
            type: SubBlockType.Quote,
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
};

Banners.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Баннеры', url: '/events'},
    slidesToShow: 1,
    arrows: true,
    children: [
        {
            type: SubBlockType.Banner,
            title: 'Программа содействия образованию и науке в области Computer Science',
            subtitle: yfm(
                'Получите грант на вычислительные ресурсы для учебно-исследовательской работы по машинному обучению, компьютерному зрению и анализу данных.',
            ).result.html,
            image: {
                light: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-compscience-new.png',
                dark: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-education-blue.png',
            },
            disableCompress: true,
            color: {
                light: '#EEF3FE',
                dark: '#000',
            },
            button: {
                text: 'Подробнее',
                url: 'https://cloud.yandex.ru/datasphere-education-program?utm_source=services&utm_medium=banner&utm_campaign=datasphere-education',
            },
        },
        {
            type: SubBlockType.Banner,
            title: 'Программа содействия образованию и науке в области Computer Science',
            subtitle: yfm(
                'Получите грант на вычислительные ресурсы для учебно-исследовательской работы по машинному обучению, компьютерному зрению и анализу данных.',
            ).result.html,
            image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-education-blue.png',
            theme: 'dark',
            disableCompress: true,
            color: '#000',
            button: {
                text: 'Подробнее',
                url: 'https://cloud.yandex.ru/datasphere-education-program?utm_source=services&utm_medium=banner&utm_campaign=datasphere-education',
            },
        },
    ],
};

AutoPlay.args = {
    type: BlockType.SliderBlock,
    title: {text: 'Карточки TutorialCard', url: '/events'},
    autoplay: 1000,
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
};
