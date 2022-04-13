import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Anchor, {AnchorProps} from '../Anchor';
import {COMPONENTS} from '../../../constants';

export default {
    component: Anchor,
    title: `${COMPONENTS}/Anchor`,
} as Meta;

const DefaultTemplate: Story<AnchorProps> = (args) => <Anchor {...args} />;

export const Default = DefaultTemplate.bind({});
