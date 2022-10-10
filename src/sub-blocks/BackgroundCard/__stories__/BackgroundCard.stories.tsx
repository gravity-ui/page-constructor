import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BackgroundCard from '../BackgroundCard';
import {BackgroundCardModel, BackgroundCardProps} from '../../../models';
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
            <BackgroundCard {...args} title="Темная тема = m" theme="dark" />
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

Default.args = data.default.content as BackgroundCardModel;
WithBackgroundImage.args = data.withBackgroundImage.content as BackgroundCardModel;
Paddings.args = data.paddings.content as BackgroundCardModel;
CardThemes.args = data.cardThemes.content as BackgroundCardModel;
BorderLine.args = data.borderLine.content as BackgroundCardModel;
BackgroundColor.args = data.backgroundColor.content as BackgroundCardModel;
WithTheme.args = data.withTheme.content as BackgroundCardModel;
