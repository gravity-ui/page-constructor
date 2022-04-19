import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Header, {HeaderProps} from '../Header';
import {COMPONENTS, HEADERS} from '../../../demo/constants';

export default {
    component: Header,
    title: `${COMPONENTS}/${HEADERS}/Header`,
} as Meta;

const DefaultTemplate: Story<HeaderProps> = (args) => (
    <Header {...args}>
        <div>Место для children</div>
    </Header>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    title: 'Безопасность Yandex Cloud',
    subtitle:
        'Грамотный подход к разработке и проектированию архитектуры, соответствие <a href="#">индустриальным стандартам</a> и законодательным требованиям, безопасность физической инфраструктуры и защита данных.',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/test-and-dev/razrabotka-big.png',
    background: {
        image: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/test-and-dev/razrabotka-big.png',
        color: '#b3e89b',
    },
};
