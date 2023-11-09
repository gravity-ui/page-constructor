import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {FormBlockDirection, FormBlockModel, isHubspotDataForm} from '../../../models';
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
            blocks: [args],
        }}
    />
);

const ContentDirectionTemplate: StoryFn<FormBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    direction: FormBlockDirection.FormContent,
                    textContent: {...args.textContent, title: 'FormContent'},
                    formData: isHubspotDataForm(args.formData)
                        ? {
                              hubspot: {...args.formData.hubspot, formInstanceId: '1'},
                          }
                        : {
                              yandex: args.formData.yandex,
                          },
                },
                {
                    ...args,
                    direction: FormBlockDirection.ContentForm,
                    textContent: {...args.textContent, title: 'ContentForm'},
                    formData: isHubspotDataForm(args.formData)
                        ? {
                              hubspot: {...args.formData.hubspot, formInstanceId: '2'},
                          }
                        : {
                              yandex: args.formData.yandex,
                          },
                },
                {
                    ...args,
                    direction: FormBlockDirection.Center,
                    textContent: {...args.textContent, title: 'Center'},
                    formData: isHubspotDataForm(args.formData)
                        ? {
                              hubspot: {...args.formData.hubspot, formInstanceId: '3'},
                          }
                        : {
                              yandex: args.formData.yandex,
                          },
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const ContentDirection = ContentDirectionTemplate.bind({});
export const WithBackgroundColor = ContentDirectionTemplate.bind({});
export const WithBackgroundImage = ContentDirectionTemplate.bind({});
export const DarkTheme = ContentDirectionTemplate.bind({});
export const YandexForm = ContentDirectionTemplate.bind({});

WithBackgroundColor.args = data.withBackground;

WithBackgroundImage.args = data.withBackgroundImage;

DarkTheme.args = data.darkTheme as FormBlockModel;

YandexForm.args = data.yandexForm;
