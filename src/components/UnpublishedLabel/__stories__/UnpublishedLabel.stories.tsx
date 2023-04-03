import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import UnpublishedLabel, {UnpublishedLabelProps} from '../UnpublishedLabel';

import data from './data.json';

export default {
    component: UnpublishedLabel,
    title: `${COMPONENTS}/UnpublishedLabel`,
} as Meta;

const DefaultTemplate: Story<UnpublishedLabelProps> = (args) => <UnpublishedLabel {...args} />;

export const Label = DefaultTemplate.bind({});
export const Line = DefaultTemplate.bind({});

Label.args = data.label.content as UnpublishedLabelProps;
Line.args = data.line.content as UnpublishedLabelProps;
