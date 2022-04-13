import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BackgroundImage from '../BackgroundImage';
import {COMPONENTS, MEDIA} from '../../../constants';
import {BackgroundImageProps} from '../../../models';

export default {
    component: BackgroundImage,
    title: `${COMPONENTS}/${MEDIA}/BackgroundImage`,
} as Meta;

const DefaultTemplate: Story<BackgroundImageProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <BackgroundImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
    alt: 'string',
    disableCompress: true,
    style: {
        height: '500px',
    },
    imageClassName: '',
    hide: false,
};
