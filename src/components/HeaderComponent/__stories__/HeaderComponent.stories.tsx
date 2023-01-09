import {Meta, Story} from '@storybook/react/types-6-0';
import {ClassNameProps, TitleProps} from '../../../models';
import React from 'react';

import HeaderComponent, {HeaderComponentProps} from '../HeaderComponent';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';
import {yfmTransform} from '../../../../.storybook/utils';

export default {
    component: HeaderComponent,
    title: `${COMPONENTS}/HeaderComponent`,
} as Meta;

const DefaultTemplate: Story<HeaderComponentProps & ClassNameProps> = (args) => (
    <HeaderComponent {...args} />
);

const SizesTemplate: Story<HeaderComponentProps & ClassNameProps> = (args) => (
    <div>
        <div style={{paddingBottom: '64px'}}>
            <HeaderComponent {...args} title={data.sizes.l as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <HeaderComponent {...args} title={data.sizes.m as TitleProps} />
        </div>
        <div style={{paddingBottom: '64px'}}>
            <HeaderComponent {...args} title={data.sizes.s as TitleProps} />
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
