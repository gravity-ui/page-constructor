import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, BannerBlockModel} from '../../../models';
import Banner from '../Banner';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

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

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BannerBlock,
    title: 'Программа содействия образованию и науке в области Computer Science',
    subtitle:
        'Получите грант на вычислительные ресурсы для учебно-исследовательской работы по машинному обучению, компьютерному зрению и анализу данных.',
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
