import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ImageBlock from '../ImageBlock';
import {COMPONENTS, MEDIA} from '../../../demo/constants';
import {ImageBlockProps} from '../../../models';

export default {
    component: ImageBlock,
    title: `${COMPONENTS}/${MEDIA}/ImageBlock`,
} as Meta;

const DefaultTemplate: Story<ImageBlockProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <ImageBlock {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/services/tracker/background_tracker_x2.png',
    alt: 'Description',
    width: '100%',
    height: 'auto',
};
