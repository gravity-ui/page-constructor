import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import CardLayout from '../CardLayout';
import {BlockType, CardLayoutBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/CardLayout',
    component: CardLayout,
} as Meta;

interface TemplateProps {
    items: CardLayoutBlockModel[];
}

const DefaultTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

export const CardsWithImage = DefaultTemplate.bind([]);
export const BackgroundCards = DefaultTemplate.bind([]);

CardsWithImage.args = {
    items: [
        {
            type: BlockType.CardLayoutBlock,
            title: 'Карточки с фото',
            children: [
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
                    title: 'Алексей&nbsp;Башкеев',
                    description: 'CEO, руководитель&nbsp;платформы',
                    links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
                    title: 'Алексей Башкеев',
                    description: 'CEO, руководитель платформы',
                    links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
                    title: 'Алексей Башкеев',
                    description: 'CEO, руководитель платформы',
                    links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
                    title: 'Алексей Башкеев',
                    description: 'CEO, руководитель платформы',
                    links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
                },
            ],
            colSizes: {
                all: 12,
                xl: 3,
                md: 4,
                sm: 6,
            },
        },
        {
            type: BlockType.CardLayoutBlock,
            title: 'Карточки с фото Fullscreen',
            description:
                'Выбор инфраструктуры во многом определяет возможности бизнеса — доступность, надежность, масштабируемость. Yandex.Cloud — технологическая платформа',
            colSizes: {
                all: 12,
                md: 4,
                sm: 6,
            },
            children: [
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    title: 'Перераспределение нагрузки',
                    description:
                        'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
                    fullScreen: true,
                    border: true,
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    title: 'Автомасштабирование по нагрузке',
                    description:
                        'Клиентов довольны нами. Присоединяйтесь и вы, чтобы убедиться в этом лично.',
                    fullScreen: true,
                    border: true,
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    title: 'Автомасштабирование по размеру',
                    description:
                        'Клиентов довольны нами. Присоединяйтесь и вы, чтобы убедиться в этом лично.',
                    fullScreen: true,
                    border: true,
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    title: 'Автоматическое восстановление',
                    description:
                        'Клиентов довольны нами. Присоединяйтесь и вы, чтобы убедиться в этом лично.',
                    fullScreen: true,
                    border: true,
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    title: 'Репликация данных',
                    description:
                        'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
                    fullScreen: true,
                    border: true,
                },
                {
                    type: BlockType.CardWithImage,
                    image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    title: 'Секционирование',
                    description:
                        'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
                    fullScreen: true,
                    border: true,
                },
            ],
        },
    ],
};

BackgroundCards.args = {
    items: [
        {
            type: BlockType.CardLayoutBlock,
            title: 'Карточки с фоном paddingBottom = s',
            animated: false,
            children: [
                {
                    type: BlockType.BackgroundCard,
                    title: 'Концепция безопасности',
                    text: 'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0001.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 's',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Что мы делаем для безопасности',
                    text: 'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0002.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 's',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Соответствие стандартам',
                    text: 'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0003.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 's',
                },
            ],
        },
        {
            type: BlockType.CardLayoutBlock,
            title: 'Карточки с фоном paddingBottom = m',
            children: [
                {
                    type: BlockType.BackgroundCard,
                    title: 'Концепция безопасности',
                    text: 'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0001.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'm',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Что мы делаем для безопасности',
                    text: 'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0002.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'm',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Соответствие стандартам',
                    text: 'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0003.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'm',
                },
            ],
        },
        {
            type: BlockType.CardLayoutBlock,
            title: 'Карточки с фоном paddingBottom = l',
            animated: true,
            children: [
                {
                    type: BlockType.BackgroundCard,
                    title: 'Концепция безопасности',
                    text: 'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0001.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'l',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Что мы делаем для безопасности',
                    text: 'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0002.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'l',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Соответствие стандартам',
                    text: 'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0003.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'l',
                },
            ],
        },
        {
            type: BlockType.CardLayoutBlock,
            title: 'Карточки с фоном paddingBottom = xl',
            children: [
                {
                    type: BlockType.BackgroundCard,
                    title: 'Концепция безопасности',
                    text: 'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0001.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'xl',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Что мы делаем для безопасности',
                    text: 'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0002.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'xl',
                },
                {
                    type: BlockType.BackgroundCard,
                    title: 'Соответствие стандартам',
                    text: 'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/security-new/background/scrt_0003.png',
                        alt: 'card-background',
                        disableCompress: true,
                    },
                    url: '#',
                    paddingBottom: 'xl',
                },
            ],
        },
    ],
};
