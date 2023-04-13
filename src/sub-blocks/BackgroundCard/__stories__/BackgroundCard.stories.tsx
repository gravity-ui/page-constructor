import React from 'react';

import yfm from '@doc-tools/transform';
import {Meta, Story} from '@storybook/react/types-6-0';

import {CARDS, COMPONENTS} from '../../../demo/constants';
import {BackgroundCardProps, ButtonProps, LinkProps} from '../../../models';
import BackgroundCard from '../BackgroundCard';

import data from './data.json';

const getPaddingBottomTitle = (padding: string) =>
    data.paddings.title.replace('{{padding}}', padding);

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
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard
                {...args}
                additionalInfo={yfm(data.common.additionalInfo).result.html}
            />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} links={data.common.links as LinkProps[]} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} buttons={data.common.buttons as ButtonProps[]} />
        </div>
    </div>
);

const PaddingsTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('S')} paddingBottom="s" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('M')} paddingBottom="m" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('L')} paddingBottom="l" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('XL')} paddingBottom="xl" />
        </div>
    </div>
);

const CardThemesTemplate: Story<BackgroundCardProps[]> = (args) => {
    return (
        <div style={{display: 'flex'}}>
            {Object.values(args).map((item, i) => (
                <div style={{maxWidth: '400px', padding: '0 8px'}} key={i}>
                    <BackgroundCard {...item} />
                </div>
            ))}
        </div>
    );
};

const BackgroundColorTemplate: Story<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard
                {...args}
                additionalInfo={yfm(data.common.additionalInfo).result.html}
            />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} links={data.common.links as LinkProps[]} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard
                {...args}
                buttons={data.cardThemes.content[1].buttons as ButtonProps[]}
            />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithBackgroundImage = DefaultTemplate.bind({});
export const Paddings = PaddingsTemplate.bind({});
export const CardThemes = CardThemesTemplate.bind([]);
export const BorderLine = DefaultTemplate.bind({});
export const BackgroundColor = BackgroundColorTemplate.bind({});

const DefaultArgs = {
    title: data.common.title,
    text: yfm(data.common.text).result.html,
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

CardThemes.args = [...data.cardThemes.content].map((item) => ({
    ...DefaultArgs,
    ...item,
})) as BackgroundCardProps[];

BorderLine.args = {
    ...DefaultArgs,
    ...data.borderLine.content,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

BackgroundColor.args = {
    ...DefaultArgs,
    ...data.backgroundColor.content,
} as BackgroundCardProps;
