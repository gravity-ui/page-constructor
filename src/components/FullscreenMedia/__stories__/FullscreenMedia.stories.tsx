import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import {MediaProps} from '../../../models';
import Media from '../../Media/Media';
import FullscreenMedia from '../FullscreenMedia';

import data from './data.json';

export default {
    component: FullscreenMedia,
    title: `${COMPONENTS}/${MEDIA}/FullscreenMedia`,
} as Meta;

const DefaultTemplate: Story<MediaProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullscreenMedia>
            {(fullscreenMediaProps = {}) => <Media {...args} {...fullscreenMediaProps} />}
        </FullscreenMedia>
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as MediaProps;
