import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';
import {MediaProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

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
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Media,
    paddingBottom: 'l',
    paddingTop: 'l',
    text: 'Test',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_light.png',
};
