import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import yfm from '@doc-tools/transform';

import YFMWrapper, {YFMWrapperProps} from '../YFMWrapper';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: YFMWrapper,
    title: `${COMPONENTS}/YFMWrapper`,
} as Meta;

const DefaultTemplate: Story<YFMWrapperProps & ClassNameProps> = (args) => <YFMWrapper {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    className: '',
    content: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
    ).result.html,
    modifiers: {},
};
