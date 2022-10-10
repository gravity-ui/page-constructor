import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Author from '../Author';
import {AuthorProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Author,
    title: `${COMPONENTS}/Author`,
} as Meta;

const DefaultTemplate: Story<AuthorProps> = (args) => <Author {...args} />;

export const Default = DefaultTemplate.bind({});
export const TextUnderImage = DefaultTemplate.bind({});
export const NoWebpInAvatar = DefaultTemplate.bind({});

Default.args = data.default.content as AuthorProps;
TextUnderImage.args = data.textUnderImage.content as AuthorProps;
NoWebpInAvatar.args = data.noWebpInAvatar.content as AuthorProps;
