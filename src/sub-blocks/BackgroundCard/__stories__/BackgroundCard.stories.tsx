import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import BackgroundCard from '../BackgroundCard';
import {BackgroundCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

export default {
    component: BackgroundCard,
    title: `${COMPONENTS}/${CARDS}/BackgroundCard`,
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultArgs: BackgroundCardProps = {
    url: '#',
    title: 'Концепция безопасности',
    text: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
    additionalInfo: yfm(
        'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
    ).result.html,
    paddingBottom: 's',
    links: [
        {
            url: '/security',
            text: 'Подробнее',
            theme: 'normal',
            arrow: true,
        },
    ],
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            url: '/#contact-form',
        },
    ],
};

const BackgroundArgs = {
    background: {
        src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
        alt: 'Концепция безопасности',
        disableCompress: true,
    },
};

const DefaultTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BackgroundCard {...args} />
    </div>
);

const PaddingsTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = s" paddingBottom="s" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = m" paddingBottom="m" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = l" paddingBottom="l" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = xl" paddingBottom="xl" />
        </div>
    </div>
);

const CardThemesTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="Тема по умолчанию = s" theme="default" />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="Темная тема = m" theme="dark" />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="Светлая тема = l" theme="light" />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithBackgroundImage = DefaultTemplate.bind({});
export const Paddings = PaddingsTemplate.bind({});
export const CardThemes = CardThemesTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const BackgroundColor = DefaultTemplate.bind({});
export const WithTheme = DefaultTemplate.bind({});

Default.args = DefaultArgs;

WithBackgroundImage.args = {
    ...DefaultArgs,
    ...BackgroundArgs,
};

Paddings.args = {
    ...DefaultArgs,
    ...BackgroundArgs,
};

CardThemes.args = {
    ...DefaultArgs,
    background: {
        src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
        alt: 'Концепция безопасности',
        disableCompress: true,
    },
};

BorderLine.args = {
    ...DefaultArgs,
    ...BackgroundArgs,
    border: 'line',
};

BackgroundColor.args = {
    ...DefaultArgs,
    ...BackgroundArgs,
    backgroundColor: '#7ccea0',
};

WithTheme.args = {
    ...DefaultArgs,
    background: {
        light: {
            src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
            alt: 'Концепция безопасности',
            disableCompress: true,
        },
        dark: {
            src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
            alt: 'Концепция безопасности',
            disableCompress: true,
        },
    },
};
