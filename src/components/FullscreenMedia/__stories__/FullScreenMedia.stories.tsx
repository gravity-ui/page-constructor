import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import {MediaProps} from '../../../models';
import Media from '../../Media/Media';
import FullScreenMedia from '../FullScreenMedia';

import data from './data.json';

export default {
    component: FullScreenMedia,
    title: `${COMPONENTS}/${MEDIA}/FullScreenMedia`,
} as Meta;

const DefaultTemplate: Story<MediaProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullScreenMedia>
            {(fullScreenMediaProps = {}) => <Media {...args} {...fullScreenMediaProps} />}
        </FullScreenMedia>
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as MediaProps;
