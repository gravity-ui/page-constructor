import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';
import {v4 as uuidv4} from 'uuid';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {FormBlockDirection, FormBlockModel, isHubspotDataForm} from '../../../models';
import FormBlock from '../Form';

import data from './data.json';

export default {
    title: 'Blocks/Form',
    component: FormBlock,
    args: {
        ...data.default,
        textContent: {
            ...data.default.textContent,
            text: yfmTransform(data.default.textContent.text),
        },
    },
    argTypes: {
        type: {control: false},
        direction: {options: Object.values(FormBlockDirection), control: {type: 'select'}},
    },
} as Meta;

const __getFormData = (formData: FormBlockModel['formData']): FormBlockModel['formData'] => {
    const id = uuidv4();
    return isHubspotDataForm(formData)
        ? ({hubspot: {...formData.hubspot, formInstanceId: id}} as FormBlockModel['formData'])
        : {yandex: formData.yandex};
};

const DefaultTemplate: StoryFn<FormBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    formData: __getFormData(args.formData),
                },
            ],
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
                    formData: __getFormData(args.formData),
                },
                {
                    ...args,
                    direction: FormBlockDirection.ContentForm,
                    textContent: {
                        ...args.textContent,
                        title: 'ContentForm',
                    },
                    formData: __getFormData(args.formData),
                },
                {
                    ...args,
                    direction: FormBlockDirection.Center,
                    textContent: {...args.textContent, title: 'Center'},
                    formData: __getFormData(args.formData),
                },
            ],
        }}
    />
);

const FormDataTemplate: StoryFn<FormBlockModel> = (args) => (
    <React.Fragment>
        <ContentDirectionTemplate {...args} />
        <ContentDirectionTemplate
            {...args}
            {...(data.default as FormBlockModel)}
            {...data.withBackground}
        />
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ContentDirection = ContentDirectionTemplate.bind({});
export const WithBackgroundColor = ContentDirectionTemplate.bind({});
export const WithBackgroundImage = ContentDirectionTemplate.bind({});
export const DarkTheme = ContentDirectionTemplate.bind({});
export const FormData = FormDataTemplate.bind({});

WithBackgroundColor.args = data.withBackground;

WithBackgroundImage.args = data.withBackgroundImage;

DarkTheme.args = data.darkTheme as FormBlockModel;

FormData.args = {...data.yandexForm, ...data.withBackgroundImage};
