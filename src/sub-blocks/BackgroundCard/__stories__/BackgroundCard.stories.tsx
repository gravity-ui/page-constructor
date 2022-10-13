import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import BackgroundCard from '../BackgroundCard';
import {BackgroundCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: BackgroundCard,
    title: `${COMPONENTS}/${CARDS}/BackgroundCard`,
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BackgroundCard {...args} />
    </div>
);

const PaddingsTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = s" paddingBottom="s" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = m" paddingBottom="m" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = l" paddingBottom="l" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="paddingBottom = xl" paddingBottom="xl" />
        </div>
    </div>
);

const CardThemesTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="Тема по умолчанию = s" theme="default" />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard
                {...args}
                title="Темная тема = m"
                theme="dark"
                background={{
                    ...args.buttons,
                    src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-black.png',
                }}
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title="Светлая тема = l" theme="light" />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithBackgroundImage = DefaultTemplate.bind({});
export const Paddings = PaddingsTemplate.bind({});
export const CardThemes = CardThemesTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const BackgroundColor = DefaultTemplate.bind({});
export const WithTheme = DefaultTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    text: yfm(data.default.content.text).result.html,
    additionalInfo: yfm(data.default.content.additionalInfo).result.html,
};

Default.args = {
    ...DefaultArgs,
} as BackgroundCardProps;

WithBackgroundImage.args = {
    ...DefaultArgs,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

Paddings.args = {
    ...DefaultArgs,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

CardThemes.args = {
    ...DefaultArgs,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

BorderLine.args = {
    ...DefaultArgs,
    ...data.borderLine.content,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

BackgroundColor.args = {
    ...DefaultArgs,
    ...data.backgroundColor.content,
} as BackgroundCardProps;

WithTheme.args = {
    ...DefaultArgs,
    ...data.withTheme.content,
} as BackgroundCardProps;
