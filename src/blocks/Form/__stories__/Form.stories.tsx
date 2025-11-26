import {Meta, StoryFn} from '@storybook/react';
import {v4 as uuidv4} from 'uuid';

import {blockTransform} from '../../../../.storybook/utils';
import {FormBlockDirection, FormBlockModel, FormBlockProps} from '../../../models';
import FormBlock from '../Form';

import ExampleStub from './components/ExmapleStub';

import data from './data.json';

export default {
    title: 'Blocks/Form',
    component: FormBlock,
} as Meta;

const DIRECTIONS_VARIANTS = [
    FormBlockDirection.FormContent,
    FormBlockDirection.ContentForm,
    FormBlockDirection.Center,
].map((direction) => ({
    ...data.default,
    direction,
    formData: {hubspot: {...data.default.formData.hubspot, formInstanceId: uuidv4()}},
}));

const DefaultTemplate: StoryFn<FormBlockModel> = (args) => (
    <FormBlock {...(blockTransform(args) as FormBlockProps)} />
);

const VariantsTemplate: StoryFn<Record<number, FormBlockModel>> = (args) => (
    <div>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '96px'}}>
                <FormBlock {...(blockTransform(arg) as FormBlockProps)} />
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const ContentDirection = VariantsTemplate.bind([]);
export const WithBackgroundColor = VariantsTemplate.bind([]);
export const WithBackgroundImage = VariantsTemplate.bind([]);
export const DarkTheme = VariantsTemplate.bind([]);
export const FormData = VariantsTemplate.bind([]);
export const WithCustomFormNode = DefaultTemplate.bind([]);

Default.args = data.default as FormBlockModel;

ContentDirection.args = DIRECTIONS_VARIANTS as FormBlockModel[];
ContentDirection.parameters = {
    controls: {
        include: Object.keys(DIRECTIONS_VARIANTS),
    },
};

WithBackgroundColor.args = DIRECTIONS_VARIANTS.map((variant) => ({
    ...variant,
    ...data.withBackground,
})) as FormBlockModel[];
WithBackgroundColor.parameters = {
    controls: {
        include: Object.keys(DIRECTIONS_VARIANTS),
    },
};

WithBackgroundImage.args = DIRECTIONS_VARIANTS.map((variant) => ({
    ...variant,
    ...data.withBackgroundImage,
})) as FormBlockModel[];
WithBackgroundImage.parameters = {
    controls: {
        include: Object.keys(DIRECTIONS_VARIANTS),
    },
};

DarkTheme.args = DIRECTIONS_VARIANTS.map((variant) => ({
    ...variant,
    ...data.darkTheme,
})) as FormBlockModel[];
DarkTheme.parameters = {
    controls: {
        include: Object.keys(DIRECTIONS_VARIANTS),
    },
};

FormData.args = [data.default, data.yandexForm] as FormBlockModel[];
FormData.parameters = {
    controls: {
        include: Object.keys(FormData.args),
    },
};

WithCustomFormNode.args = {...data.default, customFormNode: <ExampleStub />} as FormBlockModel;
