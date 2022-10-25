import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import Image, {ImageProps} from '../Image';

import data from './data.json';

export default {
    component: Image,
    title: `${COMPONENTS}/${MEDIA}/Image`,
} as Meta;

const DefaultTemplate: Story<ImageProps> = (args) => <Image {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
