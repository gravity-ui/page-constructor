import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType} from '../../../models/common';
import {MediaProps} from '../../../models/blocks';

import {BLOCKS} from '../../../demo/constants';
import {
    getDefaultStoryArgs,
    getVideoStoryArgs,
    youtubeSrc,
    dataLensSrc,
} from '../../../../.mocks/utils';

import {Media} from '../Media';

export default {
    title: `${BLOCKS}/Media`,
    component: Media,
    args: {
        theme: 'light',
    },
} as Meta;

type MediaModel = {
    type: BlockType.Media;
} & MediaProps;

const DefaultTemplate: Story<MediaModel> = (args) => (
    <div style={{maxWidth: '500px', padding: '0 40px', margin: '0 auto'}}>
        <Media {...args} />
        <Media {...args} {...getVideoStoryArgs()} />
        <Media {...args} youtube={youtubeSrc} />
        <Media {...args} dataLens={dataLensSrc} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Media,
    ...getDefaultStoryArgs(),
};
