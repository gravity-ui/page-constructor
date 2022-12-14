import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ReactPlayer, {ReactPlayerBlockProps} from '../ReactPlayer';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

import data from './data.json';

export default {
    component: ReactPlayer,
    title: `${COMPONENTS}/${MEDIA}/ReactPlayer`,
} as Meta;

const DefaultTemplate: Story<ReactPlayerBlockProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <ReactPlayer {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
