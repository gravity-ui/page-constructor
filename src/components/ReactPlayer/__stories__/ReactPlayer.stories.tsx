import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ReactPlayer, {ReactPlayerBlockProps} from '../ReactPlayer';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

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

Default.args = {
    src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.mp4',
    previewImgUrl: '',
    loop: true,
    customBarControlsClassName: '',
    showPreview: true,
    onClickPreview: () => null,
};
