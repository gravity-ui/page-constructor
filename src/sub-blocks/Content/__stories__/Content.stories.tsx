import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {
    ButtonProps,
    ClassNameProps,
    ContentBlockProps,
    ContentItemProps,
    ContentTheme,
    LinkProps,
} from '../../../models';
import Content from '../Content';

import data from './data.json';

export default {
    component: Content,
    title: 'Components/Content',
} as Meta;

const transformedContentList = data.default.content.list.map((item) => {
    return {
        ...item,
        text: item?.text && yfmTransform(item.text),
    };
}) as ContentItemProps[];

const DefaultTemplate: StoryFn<ContentBlockProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <Content {...args} additionalInfo={yfmTransform(data.default.content.additionalInfo)} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content {...args} links={data.default.content.links as LinkProps[]} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content {...args} buttons={data.default.content.buttons as ButtonProps[]} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                list={transformedContentList}
                links={data.default.content.links as LinkProps[]}
            />
        </div>
    </div>
);

const SizeTemplate: StoryFn<ContentBlockProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                title={data.size.l.title}
                list={transformedContentList}
                buttons={data.default.content.buttons as ButtonProps[]}
            />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <Content
                {...args}
                title={data.size.s.title}
                list={transformedContentList}
                buttons={data.default.content.buttons as ButtonProps[]}
                size="s"
            />
        </div>
    </div>
);

const ThemeTemplate: StoryFn<ContentBlockProps & ClassNameProps> = (args) => (
    <div>
        <div
            style={{
                paddingBottom: '64px',
                paddingTop: '64px',
                backgroundColor: '#ccf0d2',
                marginBottom: '64px',
            }}
        >
            <Content
                {...args}
                title={data.theme.light.title}
                theme={data.theme.light.theme as ContentTheme}
                buttons={data.theme.light.buttons as ButtonProps[]}
                additionalInfo={data.default.content.additionalInfo}
            />
        </div>
        <div style={{paddingBottom: '64px', paddingTop: '64px', backgroundColor: '#262626'}}>
            <Content
                {...args}
                title={data.theme.dark.title}
                theme={data.theme.dark.theme as ContentTheme}
                buttons={data.theme.dark.buttons as ButtonProps[]}
                additionalInfo={data.default.content.additionalInfo}
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
    text: yfmTransform(data.default.content.text),
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
