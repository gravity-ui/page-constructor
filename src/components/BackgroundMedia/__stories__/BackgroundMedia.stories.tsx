import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BackgroundMedia, {FullProps} from '../BackgroundMedia';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

import data from './data.json';

export default {
    component: BackgroundMedia,
    title: `${COMPONENTS}/${MEDIA}/BackgroundMedia`,
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: Story<FullProps> = (args) => (
    <div style={{maxWidth: '500px', position: 'relative'}}>
        <BackgroundMedia {...args} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const DeviceSupport = DefaultTemplate.bind({});

Image.args = data.image.content;
ImageSlider.args = data.imageSlider.content;
Video.args = data.video.content;
DeviceSupport.args = data.deviceSupport.content;
