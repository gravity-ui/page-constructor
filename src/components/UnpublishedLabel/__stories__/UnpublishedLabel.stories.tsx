import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import UnpublishedLabel, {UnpublishedLabelProps} from '../UnpublishedLabel';

import data from './data.json';

export default {
    component: UnpublishedLabel,
    title: 'Components/UnpublishedLabel',
} as Meta;

const DefaultTemplate: StoryFn<UnpublishedLabelProps> = (args) => <UnpublishedLabel {...args} />;

export const Label = DefaultTemplate.bind({});
export const Line = DefaultTemplate.bind({});

Label.args = data.label.content as UnpublishedLabelProps;
Line.args = data.line.content as UnpublishedLabelProps;
