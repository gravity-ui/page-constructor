import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import FullScreenImage, {FullScreenImageProps} from '../FullscreenImage';

import data from './data.json';

export default {
    component: FullScreenImage,
    title: `${COMPONENTS}/${MEDIA}/FullScreenImage`,
} as Meta;

const DefaultTemplate: Story<FullScreenImageProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullScreenImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as FullScreenImageProps;
