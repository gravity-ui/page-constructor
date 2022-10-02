import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import YandexForm, {YandexFormProps} from '../YandexForm';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: YandexForm,
    title: `${COMPONENTS}/YandexForm`,
    argTypes: {
        id: {
            control: {type: 'text'},
        },
    },
} as Meta;

const DefaultTemplate: Story<YandexFormProps> = (args) => <YandexForm {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
