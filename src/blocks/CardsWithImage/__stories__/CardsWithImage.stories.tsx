import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import CardsWithImage from '../CardsWithImage';
import {BlockType, CardsWithImageBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/CardsWithImage',
    component: CardsWithImage,
} as Meta;

const DefaultTemplate: Story<CardsWithImageBlockModel> = (args) => {
    return <PageConstructor content={{blocks: [args]}} />;
};

const FullScreenTemplate: Story<CardsWithImageBlockModel> = (args) => {
    return <PageConstructor content={{blocks: [args]}} />;
};
export const Default = DefaultTemplate.bind({});
export const FullScreen = FullScreenTemplate.bind({});

Default.args = {
    type: BlockType.CardsWithImageBlock,
    title: 'Executive leads',
    cards: [
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей Башкеев',
            description: 'CEO, руководитель платформы',
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей Башкеев',
            description: 'CEO, руководитель платформы',
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей Башкеев',
            description: 'CEO, руководитель платформы',
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
        {
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
};

FullScreen.args = {
    type: BlockType.CardsWithImageBlock,
    title: 'Как это работает',
    description:
        'Выбор инфраструктуры во многом определяет возможности бизнеса — доступность, надежность, масштабируемость. Yandex.Cloud — технологическая платформа',
    cards: [
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Перераспределение нагрузки',
            description:
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            fullScreen: true,
            border: true,
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Автомасштабирование по нагрузке',
            description:
                'Клиентов довольны нами. Присоединяйтесь и вы, чтобы убедиться в этом лично.',
            fullScreen: true,
            border: true,
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Автомасштабирование по размеру',
            description:
                'Клиентов довольны нами. Присоединяйтесь и вы, чтобы убедиться в этом лично.',
            fullScreen: true,
            border: true,
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Автоматическое восстановление',
            description:
                'Клиентов довольны нами. Присоединяйтесь и вы, чтобы убедиться в этом лично.',
            fullScreen: true,
            border: true,
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Репликация данных',
            description:
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            fullScreen: true,
            border: true,
        },
        {
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Секционирование',
            description:
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            fullScreen: true,
            border: true,
        },
    ],
    colSizes: {
        all: 12,
        md: 4,
        sm: 6,
    },
};
