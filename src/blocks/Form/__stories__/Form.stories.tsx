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
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const ContentForm = DefaultTemplate.bind({});
export const Background = DefaultTemplate.bind({});
export const Image = DefaultTemplate.bind({});
export const Black = DefaultTemplate.bind({});

ContentForm.args = {...data.contentForm.content} as FormBlockModel;

Background.args = {...data.background.content} as FormBlockModel;

Image.args = {...data.image.content} as FormBlockModel;

Black.args = {...data.black.content} as FormBlockModel;
