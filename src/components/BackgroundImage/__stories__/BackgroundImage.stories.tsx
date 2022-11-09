import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BackgroundImage from '../BackgroundImage';
import {COMPONENTS, MEDIA} from '../../../demo/constants';
import {BackgroundImageProps} from '../../../models';

import data from './data.json';

export default {
    component: BackgroundImage,
    title: `${COMPONENTS}/${MEDIA}/BackgroundImage`,
} as Meta;

const DefaultTemplate: Story<BackgroundImageProps> = (args) => (
    <div style={{maxWidth: '1400px'}}>
        <BackgroundImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as BackgroundImageProps;
