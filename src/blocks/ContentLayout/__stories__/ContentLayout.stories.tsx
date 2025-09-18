import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {ContentLayoutBlockModel, ContentLayoutBlockProps} from '../../../models';
import Content from '../ContentLayout';

import data from './data.json';

export default {
    title: 'Blocks/ContentLayout',
    component: Content,
} as Meta;

const SIZES = ['l', 'm', 's'].map((size) => ({
    ...data.default,
    size,
    textContent: {
        ...data.default.textContent,
        title: data.size.title.replace('{{size}}', size),
    },
}));

const DefaultTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <Content {...(blockTransform(args) as ContentLayoutBlockProps)} />
);

const VariablesTemplate: StoryFn<Record<number, ContentLayoutBlockModel>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Content {...(blockTransform(arg) as ContentLayoutBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ContentVariables = VariablesTemplate.bind([]);
export const WithFiles = VariablesTemplate.bind([]);
export const Size = VariablesTemplate.bind([]);
export const WithBackgroundColor = DefaultTemplate.bind({});
export const WithBackgroundImageAndColor = DefaultTemplate.bind({});
export const TextAlignCenter = DefaultTemplate.bind({});
export const Theme = VariablesTemplate.bind([]);
export const TextWidth = VariablesTemplate.bind([]);

Default.args = {
    ...data.default,
} as ContentLayoutBlockModel;

ContentVariables.args = {
    ...data.contentVariables,
} as ContentLayoutBlockModel[];

WithFiles.args = SIZES.map((size) => ({
    ...size,
    fileContent: data.common.fileContent,
})) as ContentLayoutBlockModel[];

Size.args = SIZES.map((size) => ({
    ...size,
    textContent: {...size.textContent, buttons: data.common.buttons},
})) as ContentLayoutBlockModel[];

WithBackgroundColor.args = data.withBackgroundColor as ContentLayoutBlockModel;

WithBackgroundImageAndColor.args = data.withImageAndBackgroundColor as ContentLayoutBlockModel;

TextAlignCenter.args = data.textAlignCenter as ContentLayoutBlockModel;

Theme.args = data.theme as ContentLayoutBlockModel[];

TextWidth.args = ['l', 'm', 's'].map((textWidth) => ({
    ...data.default,
    textWidth,
    textContent: {
        ...data.default.textContent,
        title: data.textWidth.title.replace('{{textWidth}}', textWidth),
        buttons: data.common.buttons,
    },
})) as ContentLayoutBlockModel[];
