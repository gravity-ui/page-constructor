import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import Image, {ImageOwnProps} from '../Image';

import data from './data.json';

export default {
    component: Image,
    title: `${COMPONENTS}/${MEDIA}/Image`,
} as Meta;

const DefaultTemplate: Story<ImageOwnProps> = (args) => <Image {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
