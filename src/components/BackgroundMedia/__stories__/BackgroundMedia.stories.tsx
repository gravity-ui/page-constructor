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
    <div style={{maxWidth: '1400px', position: 'relative'}}>
        <BackgroundMedia {...args} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});

Image.args = data.image.content;
Video.args = data.video.content;
