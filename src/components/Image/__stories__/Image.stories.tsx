import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {COMPONENTS, MEDIA} from '../../../constants';
import Image, {ImageProps} from '../Image';

export default {
    component: Image,
    title: `${COMPONENTS}/${MEDIA}/Image`,
} as Meta;

const DefaultTemplate: Story<ImageProps> = (args) => <Image {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
    alt: 'string',
    disableCompress: true,
    style: {
        height: '200px',
    },
};
