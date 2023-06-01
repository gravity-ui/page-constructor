import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import Media from '../../Media/Media';
import FullscreenMedia, {FullscreenMediaProps} from '../FullscreenMedia';

import data from './data.json';

export default {
    component: FullscreenMedia,
    title: `${COMPONENTS}/${MEDIA}/FullscreenMedia`,
} as Meta;

const DefaultTemplate: Story<FullscreenMediaProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullscreenMedia {...args}>
            {(fullscreenMediaProps = {}) => (
                <Media {...data.default.content} {...fullscreenMediaProps} />
            )}
        </FullscreenMedia>
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {};
