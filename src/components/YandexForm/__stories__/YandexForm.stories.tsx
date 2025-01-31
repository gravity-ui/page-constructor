import {Meta, StoryFn} from '@storybook/react';

import {YandexFormProps} from '../../../models';
import YandexForm from '../YandexForm';

import data from './data.json';

export default {
    component: YandexForm,
    title: 'Components/YandexForm',
    argTypes: {
        id: {
            control: {type: 'text'},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<YandexFormProps> = (args) => <YandexForm {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
