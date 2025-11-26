import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {ContentBlockProps, CustomBlock} from '../../../models';
import Content from '../Content';

import data from './data.json';

export default {
    component: Content,
    title: 'Components/Content',
} as Meta;

const DefaultTemplate: StoryFn<ContentBlockProps> = (args) => (
    <Content {...(blockTransform(args as CustomBlock) as ContentBlockProps)} />
);

const VariantsTemplate: StoryFn<Record<number, ContentBlockProps>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '64px'}}>
                <Content {...(blockTransform(arg as CustomBlock) as ContentBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

const BACKGROUND_COLORS = ['#ccf0d2', '#262626'];
const ThemeTemplate: StoryFn<Record<number, ContentBlockProps>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div
                key={index}
                style={{
                    marginBottom: '64px',
                    padding: '64px 0',
                    background: BACKGROUND_COLORS[index],
                }}
            >
                <Content {...(blockTransform(arg as CustomBlock) as ContentBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ContentVariables = VariantsTemplate.bind([]);
export const Size = VariantsTemplate.bind([]);
export const Centered = VariantsTemplate.bind([]);
export const Theme = ThemeTemplate.bind([]);

Default.args = data.default as ContentBlockProps;

ContentVariables.args = [
    {additionalInfo: data.default.additionalInfo},
    {links: data.default.links},
    {buttons: data.default.buttons},
    {labels: data.default.labels},
    {links: data.default.links, list: data.default.list},
].map((content) => ({
    ...content,
    title: data.default.title,
    text: data.default.text,
    type: data.default.type,
})) as ContentBlockProps[];
ContentVariables.parameters = {
    controls: {
        include: Object.keys(ContentVariables.args),
    },
};

Size.args = data.size.map((content) => ({
    ...content,
    additionalInfo: data.default.additionalInfo,
    text: data.default.text,
    buttons: data.default.buttons,
    list: data.default.list,
    labels: data.default.labels,
    type: data.default.type,
})) as ContentBlockProps[];

Size.parameters = {
    controls: {
        include: Object.keys(Size.args),
    },
};

Centered.args = [
    {additionalInfo: data.default.additionalInfo},
    {links: data.default.links},
    {buttons: data.default.buttons},
    {labels: data.default.labels},
].map((content) => ({
    ...content,
    ...data.centered,
    title: data.default.title,
    text: data.default.text,
    type: data.default.type,
})) as ContentBlockProps[];
Centered.parameters = {
    controls: {
        include: Object.keys(Centered.args),
    },
};

Theme.args = data.theme.map((content) => ({
    ...content,
    text: data.default.text,
    additionalInfo: data.default.additionalInfo,
    labels: data.default.labels,
})) as ContentBlockProps[];
Theme.parameters = {
    controls: {
        include: Object.keys(Theme.args),
    },
};
