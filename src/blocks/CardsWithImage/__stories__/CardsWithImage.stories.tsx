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
    // TODO:redefine storybook styles CLOUDFRONT-9178
    return <PageConstructor content={{blocks: [args]}} />;
};
export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.CardsWithImageBlock,
    title: {text: 'Executive leads', url: '#'},
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
