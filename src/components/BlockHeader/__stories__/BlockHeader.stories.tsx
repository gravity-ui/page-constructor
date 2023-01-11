import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {ClassNameProps, TitleProps} from '../../../models';

import BlockHeader, {HeaderComponentProps} from '../BlockHeader';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';
import {yfmTransform} from '../../../../.storybook/utils';

export default {
    component: BlockHeader,
    title: `${COMPONENTS}/HeaderComponent`,
} as Meta;

const DefaultTemplate: Story<HeaderComponentProps & ClassNameProps> = (args) => (
    <BlockHeader {...args} />
);

const SizesTemplate: Story<HeaderComponentProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.l as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.m as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <BlockHeader {...args} title={data.sizes.s as TitleProps} />
        </div>
    </div>
);

const DefaultArgs = {
    ...data.default.content,
    description: yfmTransform(data.default.content.description),
};

export const Default = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind({});

Default.args = {
    ...DefaultArgs,
} as HeaderComponentProps;
TitleLink.args = {
    ...DefaultArgs,
    title: data.titleLink.content.title,
} as HeaderComponentProps;
CustomTitle.args = {
    ...DefaultArgs,
    title: data.customTitle.content.title,
} as HeaderComponentProps;
Sizes.args = {
    ...DefaultArgs,
    title: data.customTitle.content.title,
} as HeaderComponentProps;
