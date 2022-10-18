import React, {Fragment} from 'react';
import yfm from '@doc-tools/transform';
import {Meta, Story} from '@storybook/react/types-6-0';
import {ButtonProps, HeaderBlockModel, HeaderBlockProps} from '../../../models';
import Header from '../Header';
import {PageConstructor} from '../../../containers/PageConstructor';

import data from './data.json';

type HeaderBlockPropsNoTitle = Omit<HeaderBlockProps, 'title'>;

const getSizeTitle = (size: string) => data.size.title.replace('{{size}}', size);
const getImageTitle = (text: string, image: string) =>
    data.image.title.replace('{{text}}', text).replace('{{image}}', image);
const getVerticalOffsetTitle = (offset: string) =>
    data.verticalOffset.title.replace('{{offset}}', offset);
const getBreadcrumbsTitle = (theme: string) => data.breadcrumbs.title.replace('{{theme}}', theme);

export default {
    title: 'Blocks/Header',
    component: Header,
    args: {
        image: undefined,
        video: undefined,
        background: undefined,
        breadcrumbs: undefined,
        offset: 'default',
        theme: 'light',
        verticalOffset: 'm',
    },
    argTypes: {
        overtitle: {control: 'text'},
    },
} as Meta;

const DefaultArgs = {
    ...data.default.content,
    description: yfm(data.default.content.description).result.html,
};

const DefaultTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SizeTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={getSizeTitle('"S"')} width="s" />
        <DefaultTemplate {...args} title={getSizeTitle('"M"')} width="m" />
        <DefaultTemplate {...args} title={getSizeTitle('"L"')} width="l" />
    </Fragment>
);

const ImageTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={getImageTitle('"M"', '"S"')} width="m" />
        <DefaultTemplate {...args} title={getImageTitle('"S"', '"M"')} width="s" />
    </Fragment>
);

const VerticalOffsetTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={getVerticalOffsetTitle('"S"')} verticalOffset="s" />
        <DefaultTemplate {...args} title={getVerticalOffsetTitle('"M"')} verticalOffset="m" />
        <DefaultTemplate {...args} title={getVerticalOffsetTitle('"L"')} verticalOffset="l" />
        <DefaultTemplate {...args} title={getVerticalOffsetTitle('"XL"')} verticalOffset="xl" />
    </Fragment>
);

const MediaTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={data.media.defaultTitle} />
        <DefaultTemplate {...args} title={data.media.decreasedIndentTitle} offset={'large'} />
        <DefaultTemplate
            {...args}
            title={data.media.fullWidthTitle}
            background={{...args.background, fullWidth: true}}
        />
    </Fragment>
);

const BackgroundTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={data.background.defaultTitle} />
        <DefaultTemplate
            {...args}
            title={data.background.fullWidthTitle}
            background={{
                ...args.background,
                light:
                    args.background && 'light' in args.background
                        ? {
                              ...args.background?.light,
                              fullWidth: true,
                          }
                        : {},
                dark:
                    args.background && 'dark' in args.background
                        ? {
                              ...args.background?.dark,
                              fullWidth: true,
                          }
                        : {},
            }}
        />
    </Fragment>
);

const BreadCrumbsTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={getBreadcrumbsTitle('light')} />
        <DefaultTemplate
            {...args}
            title={getBreadcrumbsTitle('dark')}
            theme={data.themeDark.content.theme as 'dark'}
            background={data.themeDark.content.background}
            buttons={
                data.themeDark.content.buttons as Pick<
                    ButtonProps,
                    'url' | 'text' | 'theme' | 'primary' | 'size'
                >[]
            }
        />
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Image = ImageTemplate.bind({});
export const VerticalOffset = VerticalOffsetTemplate.bind({});
export const Media = MediaTemplate.bind({});
export const Background = BackgroundTemplate.bind({});
export const ThemeDark = DefaultTemplate.bind({});
export const Breadcrumbs = BreadCrumbsTemplate.bind({});
export const DevicesBackground = DefaultTemplate.bind({});

Default.args = {...DefaultArgs} as HeaderBlockProps;

Size.args = {...DefaultArgs} as HeaderBlockPropsNoTitle;

Image.args = {
    ...DefaultArgs,
    ...data.image.content,
} as HeaderBlockPropsNoTitle;

VerticalOffset.args = {
    ...DefaultArgs,
    ...data.image.content,
} as HeaderBlockPropsNoTitle;

Media.args = {
    ...DefaultArgs,
    ...data.media.content,
} as HeaderBlockPropsNoTitle;

Background.args = {
    ...DefaultArgs,
    ...data.background.content,
} as HeaderBlockPropsNoTitle;

ThemeDark.args = {
    ...DefaultArgs,
    ...data.themeDark.content,
} as HeaderBlockProps;

Breadcrumbs.args = {
    ...DefaultArgs,
    ...data.breadcrumbs.content,
} as HeaderBlockProps;

DevicesBackground.args = {
    ...DefaultArgs,
    ...data.deviceBackground.content,
} as HeaderBlockProps;
