import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import FullScreenImage, {FullScreenImageProps} from '../FullscreenImage';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

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

Default.args = {
    src: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/test-and-dev/razrabotka-big.png',
    alt: 'Description',
    imageClassName: '',
    disableCompress: false,
    modalImageClass: '',
    imageStyle: {maxWidth: '500px'},
};
