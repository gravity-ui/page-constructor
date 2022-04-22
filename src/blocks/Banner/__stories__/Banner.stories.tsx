import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, BannerBlockModel} from '../../../models';
import Banner from '../Banner';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import yfm from '@doc-tools/transform';

export default {
    title: 'Блоки/Banner',
    component: Banner,
} as Meta;

const DefaultTemplate: Story<BannerBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [args],
            background: {
                light: {
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-education-blue.png',
                },
                dark: {
                    image: 'https://storage.yandexcloud.net/cloud-www-assets/edu/bnr-compscience-new.png',
                },
            },
        }}
    />
);

const WithThemeTemplate: Story<BannerBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithTheme = WithThemeTemplate.bind({});

Default.args = {
    type: BlockType.BannerBlock,
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
};

WithTheme.args = {
    type: BlockType.BannerBlock,
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
};
