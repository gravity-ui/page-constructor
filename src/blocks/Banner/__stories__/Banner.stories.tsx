import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';
import {BannerProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

import {Banner} from '../Banner';
import {getDefaultStoryArgs} from '../../../../.mocks/utils';

export default {
    title: `${BLOCKS}/Banner`,
    component: Banner,
    args: {
        theme: 'light',
    },
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

type BannerModel = {
    type: BlockType.Banner;
} & BannerProps;

const DefaultTemplate: Story<BannerModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Banner,
    color: '#7ccea0',
    ...getDefaultStoryArgs(),
    title: 'Lorem',
    text: 'Lorem ipsum dolor sit amet',
    additionalInfo: 'consectetur adipiscing elit',
};
