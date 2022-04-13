import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import UnpublishedLabel, {UnpublishedLabelProps} from '../UnpublishedLabel';
import {COMPONENTS} from '../../../constants';

export default {
    component: UnpublishedLabel,
    title: `${COMPONENTS}/UnpublishedLabel`,
} as Meta;

const DefaultTemplate: Story<UnpublishedLabelProps> = (args) => <UnpublishedLabel {...args} />;

export const Label = DefaultTemplate.bind({});
export const Line = DefaultTemplate.bind({});

Label.args = {
    type: 'label',
    className: '',
};

Line.args = {
    type: 'line',
    className: '',
};
