import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {FormBlockDirection, FormBlockModel} from '../../../models';
import FormBlock from '../Form';

import data from './data.json';

export default {
    title: 'Blocks/Form',
    component: FormBlock,
    args: data.default,
    argTypes: {
        type: {control: false},
        direction: {options: FormBlockDirection, control: {type: 'select'}},
    },
} as Meta;

const DefaultTemplate: StoryFn<FormBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    formData: {yandex: data.formData.yandex}, //yandex form
                },
                {
                    ...args,
                    formData: {hubspot: data.formData.hubspot}, //hubspot form
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const ContentDirection = DefaultTemplate.bind({});
export const WithBackgroundColor = DefaultTemplate.bind({});
export const WithBackgroundImage = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

ContentDirection.args = {...data.сontentDirection.content} as FormBlockModel;

WithBackgroundColor.args = {...data.withBackground.content} as FormBlockModel;

WithBackgroundImage.args = {...data.withBackgroundImage.content} as FormBlockModel;

DarkTheme.args = {...data.darkTheme.content} as FormBlockModel;
