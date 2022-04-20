import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import Companies from '../Companies';
import {BlockType, CompaniesBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/Companies',
    component: Companies,
} as Meta;

const DefaultTemplate: Story<CompaniesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithThemes = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.CompaniesBlock,
    title: 'Компании, которые нам доверяют',
    images: {
        desktop:
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/logos-desktop-ru.svg',
        tablet: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/logos-tablet-ru.svg',
        mobile: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/logos-mobile-ru.svg',
        alt: 'Компании, которые нам доверяют',
    },
};

WithThemes.args = {
    type: BlockType.CompaniesBlock,
    title: 'Компании, которые нам доверяют',
    images: {
        light: {
            desktop:
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/logos-desktop-ru.svg',
            tablet: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/logos-tablet-ru.svg',
            mobile: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/logos-mobile-ru.svg',
            alt: 'Компании, которые нам доверяют',
        },
        dark: {
            desktop:
                'https://storage.cloud-preprod.yandex.net/berdysheva-test/companies-block-desktop-ru.svg',
            tablet: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/companies-block-desktop-ru.svg',
            mobile: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/companies-block-mobile-ru.svg',
            alt: 'Компании, которые нам доверяют',
        },
    },
};
