import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BackgroundMedia, {FullProps} from '../BackgroundMedia';
import {COMPONENTS, MEDIA} from '../../../constants';

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
    <div style={{maxWidth: '500px', position: 'relative'}}>
        <BackgroundMedia {...args} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});

Image.args = {
    image: {
        src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/services/tracker/background_tracker_x2.png',
        alt: 'Картинка',
        disableCompress: true,
    },
};

ImageSlider.args = {
    image: [
        'https://storage.yandexcloud.net/cloud-www-assets/constructor/services/tracker/background_tracker_x2.png',
        'https://storage.yandexcloud.net/cloud-www-assets/constructor/services/datalens/background_datalens_2x.png',
    ],
};

Video.args = {
    video: {
        src: [
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.mp4',
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.webm',
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.ogv',
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
        ],
        loop: {start: 0},
    },
};
