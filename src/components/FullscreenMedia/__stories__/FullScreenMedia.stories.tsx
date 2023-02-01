import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import FullScreenMedia from '../FullScreenMedia';
import Media from '../../Media/Media';
import {MediaProps} from '../../../models';

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
