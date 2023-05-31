import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import FullscreenImage, {FullscreenImageProps} from '../FullscreenImage';

import data from './data.json';

export default {
    component: FullscreenImage,
    title: `${COMPONENTS}/${MEDIA}/FullscreenImage`,
} as Meta;

const DefaultTemplate: Story<FullscreenImageProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullscreenImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as FullscreenImageProps;
