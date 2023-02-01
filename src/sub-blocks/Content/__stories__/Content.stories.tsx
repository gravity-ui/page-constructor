import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import Content from '../Content';
import {
    ContentBlockProps,
    ClassNameProps,
    LinkProps,
    ButtonProps,
    ContentTheme,
} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Content,
    title: `${COMPONENTS}/Content`,
} as Meta;

const DefaultTemplate: Story<ContentBlockProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                additionalInfo={yfm(data.default.content.additionalInfo).result.html}
            />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content {...args} links={data.default.content.links as LinkProps[]} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content {...args} buttons={data.default.content.buttons as ButtonProps[]} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content {...args} metaInfo={yfm(data.default.content.metaInfo).result.html} />
        </div>
    </div>
);

const SizeTemplate: Story<ContentBlockProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                title={data.size.l.title}
                buttons={data.default.content.buttons as ButtonProps[]}
            />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                title={data.size.s.title}
                buttons={data.default.content.buttons as ButtonProps[]}
                size="s"
            />
        </div>
    </div>
);

const ThemeTemplate: Story<ContentBlockProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                title={data.theme.light.title}
                theme={data.theme.light.theme as ContentTheme}
                buttons={data.theme.light.buttons as ButtonProps[]}
            />
        </div>
        <div style={{paddingBottom: '64px', backgroundColor: '#7ccea0'}}>
            <Content
                {...args}
                title={data.theme.dark.title}
                theme={data.theme.dark.theme as ContentTheme}
                buttons={data.theme.dark.buttons as ButtonProps[]}
            />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Centered = DefaultTemplate.bind({});
export const Theme = ThemeTemplate.bind({});

const defaultArgs = {
    title: data.default.content.title,
    text: yfm(data.default.content.text).result.html,
};

Default.args = {
    ...defaultArgs,
} as ContentBlockProps;

Size.args = {
    ...defaultArgs,
} as ContentBlockProps;

Centered.args = {
    ...defaultArgs,
    ...data.centered.content,
} as ContentBlockProps;

Theme.args = {
    ...defaultArgs,
} as ContentBlockProps;
